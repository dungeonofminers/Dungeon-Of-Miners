import { http, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { STAKING_CHAIN_ID } from "@/content/staking.config";

/** DOM token (BEP-20) contract address on BNB Smart Chain mainnet. */
export const DOM_TOKEN_ADDRESS = "0xB33A511B88b6691bE265DdBCD0c8dbE6A4fCf515" as const;

/** The chain the staking page operates on (mainnet by default, testnet for rehearsals). */
export const stakingChain = STAKING_CHAIN_ID === 97 ? bscTestnet : bsc;

// Fallback to the configured WalletConnect project ID so it works even if env wasn't reloaded.
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "a7e06d6a615d64e635d03b92f04a9241";

// RPC URLs read from env first (e.g. private Ankr RPC endpoint) with public fallback.
const bscMainnetRpc =
  process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed.bnbchain.org";
const bscTestnetRpc =
  process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL ||
  "https://data-seed-prebsc-1-s1.bnbchain.org:8545";

export const wagmiConfig = createConfig({
  chains: [stakingChain],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId,
      relayUrl: "wss://relay.walletconnect.org",
      // We render the QR code directly inside our own ConnectWallet modal so it
      // never gets hidden behind z-index layers or blocked by third-party web components.
      showQrModal: false,
      metadata: {
        name: "Dungeon of Miners (DOM)",
        description: "Fixed-term DOM Staking on BNB Smart Chain",
        url: typeof window !== "undefined" ? window.location.origin : "https://dungeonofminers.xyz",
        icons: ["https://dungeonofminers.xyz/assets/logo-dom.png"],
      },
    }),
  ],
  transports: {
    [bsc.id]: http(bscMainnetRpc),
    [bscTestnet.id]: http(bscTestnetRpc),
  },
});
