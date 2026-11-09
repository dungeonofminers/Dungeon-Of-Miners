// Update APR rates on an existing DomStaking deployment (must be signed by the contract Owner).
//
// Target APRs (Option 1 — Simple Fixed APR):
//   - Plan 0 (30d  / Shallow Vein) : 18% APR (1800 bps)
//   - Plan 1 (90d  / Deep Vein)    : 36% APR (3600 bps)
//   - Plan 2 (180d / Abyssal Vein) : 60% APR (6000 bps)
const { ethers, network } = require("hardhat");

const TARGET_APRS = [
  { planId: 0, name: "Shallow Vein (30d)", aprBps: 1800, active: true },
  { planId: 1, name: "Deep Vein (90d)", aprBps: 3600, active: true },
  { planId: 2, name: "Abyssal Vein (180d)", aprBps: 6000, active: true },
];

async function main() {
  const contractAddr =
    process.env.STAKING_CONTRACT_ADDRESS || "0xB510D3f1E5651D4EC619B82C8aE846B3033AC190";
  const [signer] = await ethers.getSigners();
  console.log(`Network  : ${network.name}`);
  console.log(`Contract : ${contractAddr}`);
  console.log(`Signer   : ${signer.address}`);

  const staking = await ethers.getContractAt("DomStaking", contractAddr, signer);
  const owner = await staking.owner();
  console.log(`Owner    : ${owner}`);

  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    throw new Error(
      `Signer (${signer.address}) is not the contract owner (${owner}). Call setPlan from the Owner wallet / Safe.`
    );
  }

  for (const t of TARGET_APRS) {
    console.log(`\nUpdating Plan ${t.planId} (${t.name}) -> ${t.aprBps} bps (${t.aprBps / 100}% APR)...`);
    const tx = await staking.setPlan(t.planId, t.aprBps, t.active);
    console.log(`  tx hash: ${tx.hash}`);
    await tx.wait();
    console.log(`  confirmed!`);
  }

  console.log("\nAll 3 staking plans updated to 18% / 36% / 60% APR.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
