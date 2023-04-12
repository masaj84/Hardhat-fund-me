const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");

const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let ethUsdProceFeedAddress;
    //if we are on development chain set ethUsdProceFeedAddress
    if (developmentChains.includes(network.name)) {
        const etcUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdProceFeedAddress = etcUsdAggregator.address;
    }
    //if we are not on development chain => we didn't deploy mock
    else {
        ethUsdProceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    //ethUsdProceFeedAddress => lists of argments
    const args = [ethUsdProceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    //verify - ONLY WHEN NOT ON LOCAL NETWORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }

    log("--------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
