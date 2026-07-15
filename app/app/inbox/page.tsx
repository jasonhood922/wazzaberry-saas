import type { Metadata } from "next";
import Inbox from "./Inbox";

export const metadata: Metadata = {
  title: "Inbox — WazzaBerry",
  description: "Unified inbox with pre-drafted replies.",
};

export default function InboxPage() {
  return <Inbox />;
}
