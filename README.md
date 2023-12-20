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
* stable borrowing not enabled (anymore I guess), so the `borrow` call must specify `2` (for variable)
  instead of `1` (for stable)