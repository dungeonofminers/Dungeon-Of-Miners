/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // wagmi / WalletConnect / MetaMask / Coinbase SDKs pull in optional
    // peer dependencies & Node-only modules that aren't used by our
    // injected + WalletConnect setup. Alias them to false so Webpack
    // never fails with "Module not found".
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
      "pino-pretty": false,
      "@react-native-async-storage/async-storage": false,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      "@x402/evm": false,
      "@base-org/account": false,
      "@coinbase/wallet-sdk": false,
      "@gemini-wallet/core": false,
      "@metamask/sdk": false,
      "@safe-global/safe-apps-sdk": false,
      "@safe-global/safe-apps-provider": false,
      porto: false,
      "porto/internal": false,
    };
    return config;
  },
  async redirects() {
    return [
      // Retired Pre-TGE/Genesis routes — the concept no longer exists, the
      // Halving system replaced it.
      { source: "/genesis", destination: "/halving", permanent: true },
      { source: "/genesis/:path*", destination: "/halving", permanent: true },
      // Retired Rank System docs — replaced by Pickaxe Level 1-6.
      { source: "/docs/ranks", destination: "/docs/pickaxe-levels", permanent: true },
      { source: "/docs/rank", destination: "/docs/pickaxe-levels", permanent: true },
      // Retired Holding/Pool Wallet docs — replaced by the Mining
      // Storage / Available Balance model.
      { source: "/docs/wallets", destination: "/docs/balances", permanent: true },
      { source: "/docs/wallet", destination: "/docs/balances", permanent: true },
    ];
  },
};

export default nextConfig;
