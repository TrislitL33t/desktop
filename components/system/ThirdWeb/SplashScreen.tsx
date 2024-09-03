/* eslint-disable */
import type React from "react";
import { useEffect, useState } from "react";
/* eslint-enable */
import { ConnectButton, useActiveWallet } from "thirdweb/react";
import { hasAccess } from "components/system/ThirdWeb/AccessContract";
import { client, wallets } from "components/system/ThirdWeb/thirdWebClient";
import styles from "components/system/ThirdWeb/SplashScreen.module.css";

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

        const access = await hasAccess(accountDetails.address);
        if (access) {
          onConnect();
        } else {
          setError("You do not own the required OG L33tpass.");
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
        <h1>Welcome L33t</h1>
        <p>You need an OG L33tpass to log in.</p>
        <div>{error}</div>
        <ConnectButton
          client={client}
          connectModal={{
            privacyPolicyUrl: "https://pplink.com",
            showThirdwebBranding: false,
            size: "compact",
            termsOfServiceUrl: "https://toslink.com",
          }}
          wallets={wallets}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.splashScreen} ${styles.fadeIn}`}>
      <h1>Welcome L33t</h1>
      <p>You need an OG L33tpass to log in.</p>
      <ConnectButton
        client={client}
        connectModal={{
          privacyPolicyUrl: "https://pplink.com",
          showThirdwebBranding: false,
          size: "compact",
          termsOfServiceUrl: "https://toslink.com",
        }}
        wallets={wallets}
      />
      <div>
        {walletAddress ? `Connected: ${walletAddress}` : "No wallet connected"}
      </div>
    </div>
  );
};

export default SplashScreen;
