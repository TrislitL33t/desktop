/* eslint-disable */
import type React from "react";
import { useEffect, useState } from "react";
/* eslint-enable */
import { ConnectButton, useActiveWallet } from "thirdweb/react";
import { checkAccessForNFTs } from "components/system/ThirdWeb/AccessContract"; // Updated import
import { client, wallets } from "components/system/ThirdWeb/thirdWebClient";
import styles from "components/system/ThirdWeb/SplashScreen.module.css";
// Import playlistgenerator from playlistUtils.ts
import PlaylistGenerator from "components/apps/Webamp/playlistUtils";
import animatedGif from "public/System/Icons/common/WELCOME_L33T.gif";

interface SplashScreenProps {
  onConnect: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onConnect }) => {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [error, setError] = useState<string | null>();
  const [walletAddress, setWalletAddress] = useState<
    string | null | undefined
  >();
  const wallet = useActiveWallet();

  useEffect(() => {
    const fetchWalletDetails = async (): Promise<void> => {
      setCheckingAccess(true);
      try {
        if (!wallet) {
          throw new Error("No wallet connected.");
        }

        const accountDetails = wallet.getAccount();
        if (!accountDetails) {
          throw new Error("Account details not found.");
        }

        setWalletAddress(accountDetails.address);

        // Use checkAccessForNFTs to check multiple NFT access
        const { splashScreenAccess } = await checkAccessForNFTs(
          accountDetails.address
        );

        if (splashScreenAccess) {
          onConnect();
          // Run the playlist generator after successful login
          PlaylistGenerator({ walletAddress: accountDetails.address }); // Triggering the playlist generator
        } else {
          setError("Cannot find an OG L33Tpass in the connected wallet.");
        }
      } catch (error_) {
        console.error("Error checking access:", error_);
        setError(
          (error_ as Error).message ||
            "Failed to verify NFT ownership. Please try again."
        );
      } finally {
        setCheckingAccess(false);
      }
    };

    fetchWalletDetails();
  }, [wallet, onConnect]);

  if (checkingAccess) {
    return (
      <div className={`${styles.splashScreen} ${styles.fadeIn}`}>
        Checking access...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.splashScreen} ${styles.fadeIn}`}>
        <div className={styles.contentWrapper}>
          <img
            alt="Welcome L33T"
            className={styles.animatedGif}
            src={animatedGif.src}
          />
          <p>
            You need an{" "}
            <a href="https://opensea.io/collection/og-l33t-pass">OG L33Tpass</a>{" "}
            to log in.
          </p>
          <div className={styles.enterText}>
            Enter<span className={styles.cursor}>|</span>
          </div>
          <div className={styles.connectButtonWrapper}>
            <div>{error}</div>

            <ConnectButton
              client={client}
              connectModal={{
                privacyPolicyUrl:
                  "https://ipfs.io/ipfs/Qmccwy7tRLU8rNJv3C6ZuAyiigoDtwSLb2Rfo6gjHxycPL",
                requireApproval: true,
                showThirdwebBranding: false,
                size: "compact",
                termsOfServiceUrl:
                  "https://ipfs.io/ipfs/QmNRg31wsF4TJDJ6BApyaDiCZBjMf5K19cJUDVj57ijPrc",
              }}
              wallets={wallets}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.splashScreen} ${styles.fadeIn}`}>
      <div className={styles.contentWrapper}>
        <p>
          You need an{" "}
          <a href="https://opensea.io/collection/og-l33t-pass">OG L33Tpass</a>{" "}
          to log in.
          <img
            alt="Welcome L33T"
            className={styles.animatedGif}
            src={animatedGif.src}
          />
        </p>
        <div className={styles.enterText}>
          Enter<span className={styles.cursor}>|</span>
        </div>
        <div className={styles.connectButtonWrapper}>
          <ConnectButton
            client={client}
            connectModal={{
              privacyPolicyUrl:
                "https://ipfs.io/ipfs/Qmccwy7tRLU8rNJv3C6ZuAyiigoDtwSLb2Rfo6gjHxycPL",
              requireApproval: true,
              showThirdwebBranding: false,
              size: "compact",
              termsOfServiceUrl:
                "https://ipfs.io/ipfs/QmNRg31wsF4TJDJ6BApyaDiCZBjMf5K19cJUDVj57ijPrc",
            }}
            wallets={wallets}
          />

          {walletAddress
            ? `Connected: ${walletAddress}`
            : "No wallet connected"}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
