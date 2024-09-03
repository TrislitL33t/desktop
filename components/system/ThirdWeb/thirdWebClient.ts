// components/system/ThirdWeb/thirdWebClient.ts
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId,
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];
