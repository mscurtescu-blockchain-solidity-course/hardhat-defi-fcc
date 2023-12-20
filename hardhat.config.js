require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

/** @type string */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
/** @type string */
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
/** @type string */
const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type string */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY


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
    localhost: {
      chainId: 31337,
    },
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      //   accounts: {
      //     mnemonic: MNEMONIC,
      //   },
      saveDeployments: true,
      blockConfirmations: 6,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.4.19",
      },
      {
        version: "0.6.6",
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
    player: {
      default: 1,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH", // "MATIC",
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },};
