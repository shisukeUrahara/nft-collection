import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  // a function to check if wallet is connected
  const isWalletConnected = async () => {
    const { ethereum } = window;

    if (ethereum) {
      // getting the user accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } else {
      alert("PLEASE INSTALL METAMASK");
    }
  };

  // a function to connect wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
       *  method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(
        "**@ SOMETHING WENT WRONG WHILE CONNECTNG WALLET , ERROR IS , ",
        err
      );
    }
  };

  useEffect(() => {
    const init = async () => {
      isWalletConnected();
    };

    init();
  }, []);
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>

          {currentAccount === "" ? (
            <button
              onClick={connectWallet}
              className="cta-button connect-wallet-button"
            >
              Connect to Wallet
            </button>
          ) : (
            <button onClick={null} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
          {/* {renderNotConnectedContainer()} */}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
