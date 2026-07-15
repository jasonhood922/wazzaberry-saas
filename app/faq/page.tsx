import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqList from "./FaqList";

export const metadata: Metadata = {
  title: "FAQ — WazzaBerry",
  description:
    "Everything you want to know about WazzaBerry's AI sales agent: how it finds warm leads, channel safety, results, and more.",
};

export default function FaqPage() {
  return (
    <main>
      <Navbar />
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Everything you want to know about your AI sales agent.
          </p>
          <FaqList />
        </div>
      </section>
      <Footer />
    </main>
  );
}
