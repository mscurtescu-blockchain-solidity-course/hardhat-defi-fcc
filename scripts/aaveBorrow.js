const { getWeth, AMOUNT } = require("./getWeth")
const { getNamedAccounts, ethers } = require("hardhat");
const {address} = require("hardhat/internal/core/config/config-validation");

async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
    const lendingPool = await getLendingPool(deployer)

    // deposit
    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    await approveErc20(wethTokenAddress, lendingPool.target, AMOUNT, deployer)
    await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)

    // borrow
    let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(lendingPool, deployer)
    const daiPrice = await getDaiPrice()
    const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / Number(daiPrice)) // we borrow only 95% of what we could
    console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`)
    const amountDaiToBorrowWei = ethers.parseEther(amountDaiToBorrow.toString())
    console.log(`You can borrow ${amountDaiToBorrowWei.toString()} DAI WEI`)
    const daiTokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
    await borrowDai(daiTokenAddress, lendingPool, amountDaiToBorrowWei, deployer)
    await getBorrowUserData(lendingPool, deployer)
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

async function getBorrowUserData(lendingPool, account) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } = await lendingPool.getUserAccountData(account)
    console.log(`You have ${totalCollateralETH} worth of ETH deposited.`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed.`)
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH.`)

    return { availableBorrowsETH, totalDebtETH }
}

async function getDaiPrice() {
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        "0x773616E4d11A78F511299002da57A0a94577F1f4"
    )

    const price = (await daiEthPriceFeed.latestRoundData())[1]

    console.log("The DAI/ETH price is", price.toString())

    return price
}

async function borrowDai(daiAddress, lendingPool, amountDaiToBorrowWei, account) {
    const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrowWei, 2, 0, account)
    await borrowTx.wait(1)
    console.log("You've borrowed!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
