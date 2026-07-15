import type { Metadata } from "next";
import Dashboard from "./Dashboard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — WazzaBerry",
  description: "Your WazzaBerry agent dashboard.",
};

export type AgentConfig = {
  website: string;
  channels: string[];
  mode: string;
  status: string;
  created_at: string;
};

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let agent: AgentConfig | null = null;
  if (user) {
    const { data } = await supabase
      .from("agents")
      .select("website, channels, mode, status, created_at")
      .eq("user_id", user.id)
      .maybeSingle();
    agent = data;
  }

  return <Dashboard agent={agent} signedIn={!!user} />;
}
