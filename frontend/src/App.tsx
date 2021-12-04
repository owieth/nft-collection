import "./App.scss";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import NFT from "./artifacts/contracts/NFT.sol/NFT.json";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    const providerOptions = {};

    const web3Modal = new Web3Modal({
      providerOptions, // required
    });

    try {
      const provider = await web3Modal.connect();

      const web3 = new Web3(provider);

      const chainId = await web3.eth.getChainId();

      console.log(chainId);

      if (chainId === 0x4) {
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
      } else {
        alert("Choose correct Network!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0x6527a6535BBE92B34033DcbDb4147B393944EF2f";

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          NFT.abi,
          signer
        );

        let nftTxn = await connectedContract.createNFT();

        console.log("Mining...please wait.");
        await nftTxn.wait();

        connectedContract.on("NFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button
              onClick={askContractToMintNft}
              className="cta-button connect-wallet-button"
            >
              Mint NFT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
