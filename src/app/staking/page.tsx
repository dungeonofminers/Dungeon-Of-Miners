import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { siteConfig } from "@/content/site";

const StakingClient = dynamic(() => import("@/components/staking/StakingClient"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: `Staking — ${siteConfig.name} (${siteConfig.ticker})`,
  description:
    "Stake DOM for a fixed term and earn rewards. Fixed-term staking with a 7-day early-unlock penalty.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <StakingClient />;
}
