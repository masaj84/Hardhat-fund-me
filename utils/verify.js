const { run } = require("hardhat");

async function verify(contractAddress, args) {
    //via cmd:npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
    console.log("Verifying contract, please wait...");
    try {
        //normally it's enough to verify contract. But there can be some errors so, we have added try-cacth block to wrap it
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        // check if is modified, if true => continue
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
}

module.exports = { verify };
