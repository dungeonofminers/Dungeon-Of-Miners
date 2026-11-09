/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

// Deploy key is read from contracts/.env.deploy (gitignored) via process env.
// Never pass a private key on the command line.
const fs = require("fs");
const path = require("path");
const envFile = path.join(__dirname, ".env.deploy");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const accounts = process.env.DEPLOY_PRIVATE_KEY ? [process.env.DEPLOY_PRIVATE_KEY] : [];

module.exports = {
  solidity: {
    version: "0.8.26",
    settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: "paris" },
  },
  networks: {
    bscTestnet: {
      url: process.env.RPC_TESTNET_URL || "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      accounts,
    },
    bsc: {
      url: process.env.RPC_MAINNET_URL || "https://bsc-dataseed.bnbchain.org",
      chainId: 56,
      accounts,
    },
  },
};
