import type { Metadata } from "next";
import Campaigns from "./Campaigns";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Campaigns — WazzaBerry",
  description: "Campaign performance for your AI agents.",
};

export type DbCampaign = {
  id: string;
  name: string;
  channels: string[];
  status: "running" | "paused";
};

export default async function CampaignsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let realCampaigns: DbCampaign[] = [];
  if (user) {
    const { data } = await supabase
      .from("campaigns")
      .select("id, name, channels, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    realCampaigns = data ?? [];
  }

  return <Campaigns realCampaigns={realCampaigns} />;
}
