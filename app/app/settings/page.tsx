import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Settings from "./Settings";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Settings — WazzaBerry",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: agent } = await supabase
    .from("agents")
    .select("website")
    .eq("user_id", user.id)
    .maybeSingle();

  return <Settings email={user.email ?? ""} hasAgent={!!agent} />;
}
