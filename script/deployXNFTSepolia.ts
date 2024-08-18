import { ethers, network } from "hardhat";

async function main() {
  const ccipRouterAddressEthereumSepolia = `0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59`;
  const linkTokenAddressEthereumSepolia = `0x779877A7B0D9E8603169DdbD7836e478b4624789`;
  const chainIdEthereumSepolia = `16015286601757825753`;

  const xNft = await ethers.deployContract("XNFT", [
    ccipRouterAddressEthereumSepolia,
    linkTokenAddressEthereumSepolia,
    chainIdEthereumSepolia,
  ]);

  await xNft.waitForDeployment();

  console.log(`XNFT deployed on ${network.name} with address ${xNft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// XNFT deployed on ethereumSepolia with address 0xcceB52Aa2a55028Ca72BF354d56104C4b1f4170c
