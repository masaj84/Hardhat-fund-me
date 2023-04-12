//we will define netowrk config for 01-deploy-fun-me.js part
//simple methodology og keeping track of differtent price feeds and different contract addreses accross differetn chain
//chainId:11155111 - SEPOLIfeedA
const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    //31337
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = "8";
const INITIAL_PRICE = "200000000000";

module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_PRICE };
