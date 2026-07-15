import type { Metadata } from "next";
import Wizard from "./Wizard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Agent setup — WazzaBerry",
  description: "Set up your WazzaBerry AI sales agent in three minutes.",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initial: { website: string; channels: string[]; mode: string } | null =
    null;
  if (user) {
    const { data } = await supabase
      .from("agents")
      .select("website, channels, mode")
      .eq("user_id", user.id)
      .maybeSingle();
    initial = data;
  }

  return <Wizard initial={initial} />;
}
