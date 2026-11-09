/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // wagmi / WalletConnect / MetaMask SDK pull in optional Node-only modules
    // that aren't available in the browser. Mark them as false so bundling
    // doesn't emit "Can't resolve" errors.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
      "pino-pretty": false,
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
