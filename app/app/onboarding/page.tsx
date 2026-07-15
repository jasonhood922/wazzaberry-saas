import type { Metadata } from "next";
import Wizard from "./Wizard";

export const metadata: Metadata = {
  title: "Agent setup — WazzaBerry",
  description: "Set up your WazzaBerry AI sales agent in three minutes.",
};

export default function OnboardingPage() {
  return <Wizard />;
}
