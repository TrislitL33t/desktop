import { Alchemy, Network } from "alchemy-sdk";

const networkMapping: Record<string, Network> = {
  "base-mainnet": Network.BASE_MAINNET,
  "base-sepolia": Network.BASE_SEPOLIA,
  "eth-mainnet": Network.ETH_MAINNET,
  "eth-sepolia": Network.ETH_SEPOLIA,
  // Add any other networks you need
};

const selectedNetwork =
  networkMapping[process.env.ALCHEMY_NETWORK || "base-sepolia"];

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: selectedNetwork || Network.BASE_SEPOLIA,
});

// Add more contract addresses here if you want to check multiple NFTs
const nftContracts = {
  playlistAccess:
    process.env.PLAYLIST_ACCESS_CONTRACT ||
    "0xfa552ff246479cc487f98aca01a0001d5a869c47",
  splashScreenAccess:
    process.env.SPLASHSCREEN_ACCESS_CONTRACT ||
    "0xfa552ff246479cc487f98aca01a0001d5a869c47",
};

// Function to check NFT ownership for a specific contract
export async function hasAccessForContract(
  walletAddress: string,
  contractAddress: string
): Promise<boolean> {
  try {
    // Fetch NFTs owned by the wallet address
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress);

    // Check if any NFTs owned by the wallet match the specific contract
    return nfts.ownedNfts.some(
      (nft) =>
        nft.contract.address.toLowerCase() === contractAddress.toLowerCase()
    );
  } catch (error) {
    console.error("Error checking NFT ownership:", error);
    throw new Error("Failed to verify NFT ownership.");
  }
}

// Function to check both splash screen and playlist access
export async function checkAccessForNFTs(walletAddress: string): Promise<{
  playlistAccess: boolean;
  splashScreenAccess: boolean;
}> {
  try {
    // Check for access to the splash screen
    const splashScreenAccess = await hasAccessForContract(
      walletAddress,
      nftContracts.splashScreenAccess
    );

    // Check for access to the playlist
    const playlistAccess = await hasAccessForContract(
      walletAddress,
      nftContracts.playlistAccess
    );

    return { playlistAccess, splashScreenAccess };
  } catch (error) {
    console.error("Error checking NFT access:", error);
    throw new Error("Failed to verify NFT access.");
  }
}
