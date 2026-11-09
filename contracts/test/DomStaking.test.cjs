const { expect } = require("chai");
const { ethers, network } = require("hardhat");

const DAY = 24 * 60 * 60;
const YEAR = 365 * DAY;
const e = (n) => ethers.parseEther(String(n));

async function increase(seconds) {
  await network.provider.send("evm_increaseTime", [seconds]);
  await network.provider.send("evm_mine");
}

describe("DomStaking", function () {
  let token, staking, owner, alice, bob;
  // Plans: 30d @ 6%, 90d @ 12%, 180d @ 20%
  const durations = [30 * DAY, 90 * DAY, 180 * DAY];
  const aprs = [600, 1200, 2000];

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    token = await ethers.deployContract("MockDOM");
    staking = await ethers.deployContract("DomStaking", [
      await token.getAddress(),
      owner.address,
      e(100),
      e(5_000_000),
      durations,
      aprs,
    ]);
    await token.transfer(alice.address, e(10_000_000));
    await token.transfer(bob.address, e(10_000_000));
    await token.connect(alice).approve(await staking.getAddress(), ethers.MaxUint256);
    await token.connect(bob).approve(await staking.getAddress(), ethers.MaxUint256);
    // Fund reward pool with 1M DOM
    await token.approve(await staking.getAddress(), ethers.MaxUint256);
    await staking.fundRewards(e(1_000_000));
  });

  const expectedReward = (amount, apr, dur) => (amount * BigInt(apr) * BigInt(dur)) / (10_000n * BigInt(YEAR));

  it("stores plans and limits", async () => {
    const plans = await staking.getPlans();
    expect(plans.length).to.equal(3);
    expect(plans[1].duration).to.equal(90 * DAY);
    expect(plans[1].aprBps).to.equal(1200);
    expect(await staking.minStake()).to.equal(e(100));
    expect(await staking.rewardPool()).to.equal(e(1_000_000));
  });

  it("stakes and reserves the full reward up front", async () => {
    const amount = e(10_000);
    const reward = expectedReward(amount, 1200, 90 * DAY);
    await expect(staking.connect(alice).stake(amount, 1))
      .to.emit(staking, "Staked")
      .withArgs(alice.address, 0, 1, amount, reward, (v) => v > 0n);
    expect(await staking.totalStaked()).to.equal(amount);
    expect(await staking.totalReserved()).to.equal(reward);
    expect(await staking.rewardPool()).to.equal(e(1_000_000) - reward);
    expect(await staking.activeStakers()).to.equal(1);
    expect(await staking.quoteReward(amount, 1)).to.equal(reward);
  });

  it("pays principal + full reward at maturity", async () => {
    const amount = e(10_000);
    const reward = expectedReward(amount, 2000, 180 * DAY);
    await staking.connect(alice).stake(amount, 2);
    await increase(180 * DAY);
    const before = await token.balanceOf(alice.address);
    await expect(staking.connect(alice).unstake(0))
      .to.emit(staking, "Unstaked")
      .withArgs(alice.address, 0, amount, reward, 0, true);
    expect((await token.balanceOf(alice.address)) - before).to.equal(amount + reward);
    expect(await staking.totalStaked()).to.equal(0);
    expect(await staking.totalReserved()).to.equal(0);
    expect(await staking.totalRewardsPaid()).to.equal(reward);
    expect(await staking.activeStakers()).to.equal(0);
  });

  it("charges a 10% penalty and forfeits rewards inside the first 7 days", async () => {
    const amount = e(10_000);
    await staking.connect(alice).stake(amount, 0);
    const poolBefore = await staking.rewardPool();
    await increase(3 * DAY);
    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).unstake(0);
    const penalty = amount / 10n;
    expect((await token.balanceOf(alice.address)) - before).to.equal(amount - penalty);
    expect(await staking.totalPenalties()).to.equal(penalty);
    const reward = expectedReward(amount, 600, 30 * DAY);
    // pool regains forfeited reward + penalty
    expect(await staking.rewardPool()).to.equal(poolBefore + reward + penalty);
  });

  it("returns full principal (no rewards) after 7 days but before maturity", async () => {
    const amount = e(10_000);
    await staking.connect(alice).stake(amount, 1);
    await increase(8 * DAY);
    const [principalOut, rewardOut, penalty, matured] = await staking.previewUnstake(alice.address, 0);
    expect(principalOut).to.equal(amount);
    expect(rewardOut).to.equal(0);
    expect(penalty).to.equal(0);
    expect(matured).to.equal(false);
    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).unstake(0);
    expect((await token.balanceOf(alice.address)) - before).to.equal(amount);
  });

  it("cannot unstake twice or an unknown position", async () => {
    await staking.connect(alice).stake(e(1_000), 0);
    await staking.connect(alice).unstake(0);
    await expect(staking.connect(alice).unstake(0)).to.be.revertedWithCustomError(staking, "AlreadyClosed");
    await expect(staking.connect(alice).unstake(5)).to.be.revertedWithCustomError(staking, "InvalidPosition");
    await expect(staking.connect(bob).unstake(0)).to.be.revertedWithCustomError(staking, "InvalidPosition");
  });

  it("enforces min / max stake and plan validity", async () => {
    await expect(staking.connect(alice).stake(e(99), 0)).to.be.revertedWithCustomError(staking, "BelowMinStake");
    await expect(staking.connect(alice).stake(e(5_000_001), 0)).to.be.revertedWithCustomError(staking, "AboveMaxStake");
    await expect(staking.connect(alice).stake(e(1_000), 7)).to.be.revertedWithCustomError(staking, "InvalidPlan");
    await staking.updatePlan(0, 600, false);
    await expect(staking.connect(alice).stake(e(1_000), 0)).to.be.revertedWithCustomError(staking, "PlanInactive");
  });

  it("rejects stakes the reward pool cannot cover", async () => {
    // 180d @ 20% => reward ≈ 9.86% of amount. 1M pool covers ~10.14M principal.
    await staking.setStakeLimits(e(100), 0);
    await expect(staking.connect(alice).stake(e(10_200_000), 2)).to.be.reverted; // alice only has 10M
    await token.transfer(alice.address, e(5_000_000));
    await expect(staking.connect(alice).stake(e(11_000_000), 2)).to.be.revertedWithCustomError(
      staking,
      "InsufficientRewardPool"
    );
  });

  it("pause blocks new stakes but never unstaking", async () => {
    await staking.connect(alice).stake(e(1_000), 0);
    await staking.pause();
    await expect(staking.connect(bob).stake(e(1_000), 0)).to.be.revertedWithCustomError(staking, "EnforcedPause");
    await increase(30 * DAY);
    await expect(staking.connect(alice).unstake(0)).to.not.be.reverted;
  });

  it("owner can only withdraw unreserved rewards — never principal or reservations", async () => {
    const amount = e(100_000);
    await staking.connect(alice).stake(amount, 2);
    const pool = await staking.rewardPool();
    await expect(staking.withdrawExcessRewards(owner.address, pool + 1n)).to.be.revertedWithCustomError(
      staking,
      "ExceedsExcess"
    );
    await staking.withdrawExcessRewards(owner.address, pool);
    expect(await staking.rewardPool()).to.equal(0);
    // Alice still gets everything at maturity.
    await increase(180 * DAY);
    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).unstake(0);
    const reward = expectedReward(amount, 2000, 180 * DAY);
    expect((await token.balanceOf(alice.address)) - before).to.equal(amount + reward);
  });

  it("restricts admin functions to the owner", async () => {
    await expect(staking.connect(alice).pause()).to.be.revertedWithCustomError(staking, "OwnableUnauthorizedAccount");
    await expect(staking.connect(alice).addPlan(60 * DAY, 800)).to.be.revertedWithCustomError(
      staking,
      "OwnableUnauthorizedAccount"
    );
    await expect(staking.connect(alice).withdrawExcessRewards(alice.address, 1)).to.be.revertedWithCustomError(
      staking,
      "OwnableUnauthorizedAccount"
    );
  });

  it("caps plan parameters", async () => {
    await expect(staking.addPlan(60 * DAY, 5_001)).to.be.revertedWithCustomError(staking, "InvalidPlanParams");
    await expect(staking.addPlan(1, 500)).to.be.revertedWithCustomError(staking, "InvalidPlanParams");
    await expect(staking.updatePlan(0, 0, true)).to.be.revertedWithCustomError(staking, "InvalidPlanParams");
  });

  it("plan changes do not affect existing positions", async () => {
    const amount = e(10_000);
    await staking.connect(alice).stake(amount, 1);
    await staking.updatePlan(1, 100, true);
    await increase(90 * DAY);
    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).unstake(0);
    expect((await token.balanceOf(alice.address)) - before).to.equal(amount + expectedReward(amount, 1200, 90 * DAY));
  });

  it("tracks active stakers across multiple positions", async () => {
    await staking.connect(alice).stake(e(1_000), 0);
    await staking.connect(alice).stake(e(1_000), 1);
    await staking.connect(bob).stake(e(1_000), 0);
    expect(await staking.activeStakers()).to.equal(2);
    await staking.connect(alice).unstake(0);
    expect(await staking.activeStakers()).to.equal(2);
    await staking.connect(alice).unstake(1);
    expect(await staking.activeStakers()).to.equal(1);
    const positions = await staking.getPositions(alice.address);
    expect(positions.length).to.equal(2);
    expect(positions[0].closed).to.equal(true);
  });

  it("rejects fee-on-transfer tokens", async () => {
    const fee = await ethers.deployContract("MockFeeToken");
    const s2 = await ethers.deployContract("DomStaking", [
      await fee.getAddress(),
      owner.address,
      e(1),
      0,
      [30 * DAY],
      [600],
    ]);
    await fee.transfer(await s2.getAddress(), e(10_000)); // fund pool
    await fee.approve(await s2.getAddress(), ethers.MaxUint256);
    await expect(s2.stake(e(100), 0)).to.be.revertedWithCustomError(s2, "UnsupportedToken");
  });

  it("prevents the owner from rescuing DOM via recoverERC20", async () => {
    await expect(
      staking.recoverERC20(await token.getAddress(), owner.address, 1)
    ).to.be.revertedWithCustomError(staking, "UnsupportedToken");
  });

  it("blocks renounceOwnership so excess reward pool can never be locked forever", async () => {
    await expect(staking.renounceOwnership()).to.be.revertedWithCustomError(
      staking,
      "OwnershipCannotBeRenounced"
    );
  });

  it("supports paginated position reads and rejects zero-amount funding/withdrawal", async () => {
    await staking.connect(alice).stake(e(100), 0);
    await staking.connect(alice).stake(e(200), 1);
    await staking.connect(alice).stake(e(300), 2);
    const slice = await staking.getPositionsSlice(alice.address, 1, 2);
    expect(slice.length).to.equal(2);
    expect(slice[0].amount).to.equal(e(200));
    expect(slice[1].amount).to.equal(e(300));
    await expect(staking.fundRewards(0)).to.be.revertedWithCustomError(staking, "ZeroAmount");
    await expect(staking.withdrawExcessRewards(owner.address, 0)).to.be.revertedWithCustomError(
      staking,
      "ZeroAmount"
    );
  });
});
