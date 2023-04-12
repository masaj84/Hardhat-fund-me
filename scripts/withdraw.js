const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    const { deployer } = await getNamedAccounts();
    const fundMe = await ethers.getContract("FundMe", deployer);
    console.log("Funding Contract...");
    const transactionResponse = await fundMe.withdraw();
    await transactionResponse.wait(1);
    console.log("Go it back!!!!!!!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// const { deployer } = await getNamedAccounts();
// const fundMe = await ethers.getContract("FundMe", deployer);
// console.log("Funding Contract...");
// const transactionResponse = await fundMe.fund({
//     value: ethers.utils.parseEther("0.1"),
// });
// await transactionResponse.wait(1);
// console.log("FOUNDED...!!!!!!!");
// //const transactionReceipt = transactionResponse;
