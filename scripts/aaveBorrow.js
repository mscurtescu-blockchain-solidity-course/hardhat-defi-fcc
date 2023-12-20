const { getWeth, AMOUNT } = require("./getWeth")
const { getNamedAccounts, ethers } = require("hardhat");
const {address} = require("hardhat/internal/core/config/config-validation");

async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
    const lendingPool = await getLendingPool(deployer)
    console.log(`lending pool address: ${lendingPool.target}`)

    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

    await approveErc20(wethTokenAddress, lendingPool.target, AMOUNT, deployer)
    console.log("Depositing...")
    await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    console.log("Deposited!")
}

async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        await ethers.provider.getSigner(account)
    )

    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool()

    return await ethers.getContractAt(
        "ILendingPool",
        lendingPoolAddress,
        await ethers.provider.getSigner(account)
    )
}

async function approveErc20(erc20Address, spenderAddress, amountToSpend, account) {
    const erc20Token = await ethers.getContractAt(
        "IERC20",
        erc20Address,
        await ethers.provider.getSigner(account)
    )

    const txResponse = await erc20Token.approve(spenderAddress, amountToSpend)
    await txResponse.wait(1)
    console.log("Approved!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
