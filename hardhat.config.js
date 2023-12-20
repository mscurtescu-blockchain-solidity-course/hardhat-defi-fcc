require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

/** @type string */
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_RPC_URL
      },
      blockConfirmations: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.4.19",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.8.19",
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
