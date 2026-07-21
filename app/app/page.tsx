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

export type DbLead = {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  score: number | null;
  signal: string | null;
  channel: string | null;
  status: "queued" | "contacted" | "replied" | "meeting_booked";
};

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let agent: AgentConfig | null = null;
  let realLeads: DbLead[] = [];
  if (user) {
    const [{ data: agentRow }, { data: leadRows }] = await Promise.all([
      supabase
        .from("agents")
        .select("website, channels, mode, status, created_at")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("leads")
        .select("id, name, company, role, score, signal, channel, status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(25),
    ]);
    agent = agentRow;
    realLeads = leadRows ?? [];
  }

  return <Dashboard agent={agent} signedIn={!!user} realLeads={realLeads} />;
}
