// Verify a deployed DomStaking contract on BscScan (Mainnet 56 or Testnet 97).
//
// Usage:
//   npm --prefix contracts run verify:testnet -- <CONTRACT_ADDRESS>
//   npm --prefix contracts run verify:mainnet -- <CONTRACT_ADDRESS>
//
// How it works:
// 1. Reads constructor arguments (stakingToken, owner, minStake, maxStake, durations, aprs)
//    directly from the live contract on-chain — so you can never pass the wrong values.
// 2. Prints the exact ABI-encoded Constructor Arguments hex (for manual upload if desired).
// 3. If ETHERSCAN_API_KEY is set in contracts/.env.deploy, submits DomStaking.standard-input.json
//    to the Etherscan/BscScan API v2 and waits until "Pass - Verified".
const fs = require("fs");
const path = require("path");
const { ethers, network } = require("hardhat");

const COMPILER_VERSION = "v0.8.26+commit.8a97fa7a";
const LICENSE_MIT = "3";
const EXPLORER = {
  56: "https://bscscan.com",
  97: "https://testnet.bscscan.com",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const address = process.env.VERIFY_ADDRESS || process.argv.find((a) => /^0x[0-9a-fA-F]{40}$/.test(a));
  if (!address) {
    throw new Error(
      "Pass the deployed DomStaking contract address, e.g.:\n  npm --prefix contracts run verify:mainnet -- 0xYourContractAddress"
    );
  }

  const { chainId: chainIdBig } = await ethers.provider.getNetwork();
  const chainId = Number(chainIdBig);
  const code = await ethers.provider.getCode(address);
  if (!code || code === "0x") {
    throw new Error(`No contract bytecode found at ${address} on chain ${chainId} (${network.name}).`);
  }

  const staking = await ethers.getContractAt("DomStaking", address);
  const [token, owner, minStake, maxStake, plans] = await Promise.all([
    staking.stakingToken(),
    staking.owner(),
    staking.minStake(),
    staking.maxStake(),
    staking.getPlans(),
  ]);

  const durations = plans.map((p) => p.duration);
  const aprs = plans.map((p) => p.aprBps);

  const encodedArgs = ethers.AbiCoder.defaultAbiCoder()
    .encode(
      ["address", "address", "uint256", "uint256", "uint64[]", "uint16[]"],
      [token, owner, minStake, maxStake, durations, aprs]
    )
    .slice(2);

  console.log(`Contract   : ${address} (chain ${chainId})`);
  console.log(`Token      : ${token}`);
  console.log(`Owner      : ${owner}`);
  console.log(`Min / Max  : ${ethers.formatEther(minStake)} / ${ethers.formatEther(maxStake)} DOM`);
  console.log(`Plans      : ${plans.map((p) => `${Number(p.duration) / 86400}d@${Number(p.aprBps) / 100}%`).join(", ")}`);
  console.log(`\n--- Manual BscScan Verify Details ---`);
  console.log(`Compiler Type        : Solidity (Standard-Json-Input)`);
  console.log(`Compiler Version     : ${COMPILER_VERSION}`);
  console.log(`License              : MIT (3)`);
  console.log(`Contract Name        : contracts/DomStaking.sol:DomStaking`);
  console.log(`Standard-Input File  : contracts/DomStaking.standard-input.json`);
  console.log(`Constructor Args Hex :\n${encodedArgs}\n`);

  const apiKey = (process.env.ETHERSCAN_API_KEY || "").trim();
  if (!apiKey) {
    console.log(
      "Tip: set ETHERSCAN_API_KEY in contracts/.env.deploy to submit verification automatically,\n" +
        `or upload contracts/DomStaking.standard-input.json manually at ${EXPLORER[chainId] || "https://bscscan.com"}/verifyContract?a=${address}`
    );
    return;
  }

  const stdPath = path.join(__dirname, "..", "DomStaking.standard-input.json");
  if (!fs.existsSync(stdPath)) {
    throw new Error("Missing contracts/DomStaking.standard-input.json — run `npm --prefix contracts run export-abi` first.");
  }
  const standardInput = fs.readFileSync(stdPath, "utf8");

  const base = `https://api.etherscan.io/v2/api?chainid=${chainId}`;
  const form = new URLSearchParams({
    apikey: apiKey,
    module: "contract",
    action: "verifysourcecode",
    codeformat: "solidity-standard-json-input",
    sourceCode: standardInput,
    contractaddress: address,
    contractname: "contracts/DomStaking.sol:DomStaking",
    compilerversion: COMPILER_VERSION,
    constructorArguements: encodedArgs,
    licenseType: LICENSE_MIT,
  });

  console.log("Submitting source code to BscScan / Etherscan v2 API…");
  const submitRes = await fetch(base, { method: "POST", body: form });
  const submit = await submitRes.json();
  const firstMsg = String(submit.result ?? "");

  if (submit.status !== "1") {
    if (/already verified/i.test(firstMsg)) {
      console.log(`VERIFIED (already verified): ${EXPLORER[chainId]}/address/${address}#code`);
      return;
    }
    throw new Error(`BscScan submission rejected: ${firstMsg}`);
  }

  const guid = firstMsg;
  console.log(`Submitted (GUID: ${guid}). Polling verification status…`);
  const statusParams = new URLSearchParams({
    apikey: apiKey,
    module: "contract",
    action: "checkverifystatus",
    guid,
  });

  for (let i = 0; i < 36; i++) {
    await sleep(5000);
    const checkRes = await fetch(`${base}&${statusParams}`);
    const check = await checkRes.json();
    const msg = String(check.result ?? "");
    if (/pending/i.test(msg)) continue;
    if (check.status === "1" || /already verified/i.test(msg)) {
      console.log(`VERIFIED: ${msg}`);
      console.log(`${EXPLORER[chainId]}/address/${address}#code`);
      return;
    }
    throw new Error(`Verification failed: ${msg}`);
  }
  console.log("Timed out waiting for BscScan response; check the contract page in a minute.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
