const { ethers } = require("hardhat");
const { BigNumber } = ethers;
const { expect } = require("chai");

async function main() {
  const ChatLib = await ethers.getContractFactory("ChatLib");
  const chatLib = await ChatLib.deploy();

  const ChatLib2 = await ethers.getContractFactory("ChatLib2");
  const chatLib2 = await ChatLib2.deploy();

  await chatLib.deployed();
  await chatLib2.deployed();

  const ChatAppV2 = await ethers.getContractFactory("ChatAppV2", {
    libraries: {
      ChatLib: chatLib.address,
      ChatLib2: chatLib2.address,
    },
  });
  const chatApp = await ChatAppV2.deploy();

  await chatApp.deployed();

  console.log(` Contract Address: ${chatApp.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
