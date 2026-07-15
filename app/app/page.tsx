import type { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — WazzaBerry",
  description: "WazzaBerry demo dashboard with sample data.",
};

export default function AppPage() {
  return <Dashboard />;
}
