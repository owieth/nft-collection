import hre from "hardhat";
import { ethers } from 'ethers';

async function main() {
  const nft = await hre.ethers.getContractFactory("NFT");
  const nftContract = await nft.deploy();

  await nftContract.deployed();

  console.log("Contract deployed to:", nftContract.address);


  // Call the function.
  let txn = await nftContract.createNFT()
  // Wait for it to be mined.
  await txn.wait()

  // Mint another NFT for fun.
  txn = await nftContract.createNFT()
  // Wait for it to be mined.
  await txn.wait()
  // Mint another NFT for fun.
  txn = await nftContract.createNFT()
  // Wait for it to be mined.
  await txn.wait()
  // Mint another NFT for fun.
  txn = await nftContract.createNFT()
  // Wait for it to be mined.
  await txn.wait()
  // Mint another NFT for fun.
  txn = await nftContract.createNFT()
  // Wait for it to be mined.
  await txn.wait()
  // Mint another NFT for fun.
  txn = await nftContract.createNFT()
  // Wait for it to be mined.
  await txn.wait()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
