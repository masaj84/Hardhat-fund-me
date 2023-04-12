const { network } = require("hardhat");
const {
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    //deploy, log => functions that we poll from deployments
    //deployer => account list from getNamedAccounts()
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mock...");
        //we deploy MockVeAggregator from test
        //Arguments
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            //will spit information on deploying, like tx:, deployed at:, gas
            log: true,
            //those are arguments of CTOR - MockV3Aggregator?
            args: [DECIMALS, INITIAL_PRICE],
        });
        log("Mocks deployed");
        log("-----------------------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
