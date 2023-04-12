const { getNamedAccounts, ethers, network } = require("hardhat");
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

//!!!if developmentChains contsing network.name we will skip, with use of (ternary operator)=> "?:"
developmentChains.includes(network.name)
    ? describe.skip //!!!this tells test to skip the rest
    : describe("FundMe", function () {
          let fundMe;
          let deployer;
          //!!!let mockV3Aggregator;
          const sendValue = ethers.utils.parseEther("1");

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;

              //!!!we don't need fixtures, becouse on staging test we assume is already deployed
              //await deployments.fixture(["all"]);
              fundMe = await ethers.getContract("FundMe", deployer);
              //!!!No Mock - no staging we assumingh we are on testnet
              // mockV3Aggregator = await ethers.getContract(
              //     "MockV3Aggregator",
              //     deployer
              // );
          });

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue });
              await fundMe.withdraw();
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );

              assert.equal(endingBalance.toString(), "0");
          });
      });
