import type { Metadata } from "next";
import Campaigns from "./Campaigns";

export const metadata: Metadata = {
  title: "Campaigns — WazzaBerry",
  description: "Campaign performance for your AI agents.",
};

export default function CampaignsPage() {
  return <Campaigns />;
}
