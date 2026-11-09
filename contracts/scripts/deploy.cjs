// Deploy DomStaking.
//
//   1. cp .env.deploy.example .env.deploy   (fill it in with an editor — never on the CLI)
//   2. npm --prefix contracts run deploy:testnet   (BSC testnet, chain 97, tDOM)
//   3. npm --prefix contracts run deploy:mainnet   (BSC mainnet, chain 56, DOM)
//
// After deploy:
//   - Ownership is set to STAKING_OWNER (the Staking Reward Safe) in the constructor;
//     the deployer key holds no power afterwards.
//   - Verify on BscScan: npm --prefix contracts run verify:mainnet -- <CONTRACT_ADDRESS>
//   - Fund the reward pool from the Safe: plain DOM transfer to the contract address.
//   - Set NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS (+ NEXT_PUBLIC_STAKING_CHAIN_ID) in the website env.
const { ethers, network } = require("hardhat");

const DAY = 24 * 60 * 60;

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name} in contracts/.env.deploy`);
  return v;
}

async function main() {
  const token = required("STAKING_TOKEN_ADDRESS");
  const owner = required("STAKING_OWNER_ADDRESS");
  const minStake = ethers.parseEther(process.env.STAKING_MIN_STAKE || "100");
  const maxStake = ethers.parseEther(process.env.STAKING_MAX_STAKE || "5000000");

  // Plans: 30d @ 6% · 90d @ 12% · 180d @ 20% APR (keep in sync with src/content/staking.config.ts)
  const durations = [30 * DAY, 90 * DAY, 180 * DAY];
  const aprs = [600, 1200, 2000];

  const [deployer] = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  console.log(`network   ${network.name} (chain ${chainId})`);
  console.log(`deployer  ${deployer.address}`);
  console.log(`token     ${token}`);
  console.log(`owner     ${owner}`);
  if (owner.toLowerCase() === deployer.address.toLowerCase() && chainId === 56n) {
    throw new Error("On mainnet the owner must be the Staking Reward Safe, not the deployer.");
  }

  const staking = await ethers.deployContract("DomStaking", [token, owner, minStake, maxStake, durations, aprs]);
  await staking.waitForDeployment();
  const address = await staking.getAddress();

  const encodedArgs = ethers.AbiCoder.defaultAbiCoder()
    .encode(
      ["address", "address", "uint256", "uint256", "uint64[]", "uint16[]"],
      [token, owner, minStake, maxStake, durations, aprs]
    )
    .slice(2);

  const explorer = chainId === 97n ? "https://testnet.bscscan.com" : "https://bscscan.com";

  console.log(`\nDomStaking deployed: ${address}`);
  console.log(`tx: ${staking.deploymentTransaction().hash}`);
  console.log(`Contract Page : ${explorer}/address/${address}#code`);
  console.log(`Direct Verify : ${explorer}/verifyContract?a=${address}`);
  console.log(`\nBscScan Constructor Arguments (ABI-encoded hex):\n${encodedArgs}`);
  console.log(`\nWebsite env:\nNEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=${address}\nNEXT_PUBLIC_STAKING_CHAIN_ID=${chainId}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
