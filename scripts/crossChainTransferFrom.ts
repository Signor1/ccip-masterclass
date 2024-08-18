import { ethers, network } from "hardhat";
import { Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `arbitrumSepolia`) {
    console.error(`Must be called from Arbitrum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ARBITRUM_SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressArbitrumSepolia = `0x9aF75efA7386a5cfEB5119359f65D9A45d3D94b8`;

  const from = `0xd9dBe0daa503Caa6e061f1902a7AF22af096E645`;
  const to = `0xd9dBe0daa503Caa6e061f1902a7AF22af096E645`;
  const tokenId = 0; // put NFT token id here
  const destinationChainSelector = `16015286601757825753`;
  const payFeesIn = 1; // 0 - Native, 1 - LINK

  const xNft: XNFT = XNFT__factory.connect(xNftAddressArbitrumSepolia, signer);

  const tx = await xNft.crossChainTransferFrom(
    from,
    to,
    tokenId,
    destinationChainSelector,
    payFeesIn
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Transaction hash: 0xc6c0d506f90a2802f39fc6ff81647ebfaf4ab27025f92ecd4f6683ff6df42d17
