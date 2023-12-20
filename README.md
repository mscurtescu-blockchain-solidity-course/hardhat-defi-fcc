# Lesson 13: Hardhat DeFi & Aave

Lesson 13 from the Web3, Full Stack Solidity, Smart Contract & Blockchain - Beginner to Expert ULTIMATE
Course | Javascript Edition:
https://github.com/smartcontractkit/full-blockchain-solidity-course-js#lesson-13-hardhat-defi--aave

Official code at:
https://github.com/PatrickAlphaC/hardhat-defi-fcc


## Goals

1. Deposit collateral: ETH / WETH
2. Borrow another asset: DAI
3. Repay the DAI (most of it)


## Notes

* AAVE treats everything as an ERC20 token
 * but ETH is not an ERC20, hence WETH
 * https://weth.io/
 * WETH contract on Sepolia: https://sepolia.etherscan.io/token/0xd0df82de051244f04bff3a8bb1f62e1cd39eed92
   * deposit ETH to contract to get WETH back: https://sepolia.etherscan.io/address/0xd0df82de051244f04bff3a8bb1f62e1cd39eed92#writeContract
* AAVE v2 is used
  * the v3 API is different, but v3 is deployed to Sepolia
  * v2 is not deployed to Sepolia, only to Goerli
* Mainnet contract and token addresses are used
  * the hardhat network is a Mainnet fork
* stable borrowing and repaying not enabled (anymore I guess)
  * the `borrow` and `repay` calls must specify `2` (for variable) instead of `1` (for stable)
