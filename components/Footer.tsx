import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Sections",
    links: [
      { label: "Solution", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Connect MCP", href: "/connect-mcp" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "General Terms", href: "/terms" },
      { label: "Legal Notice", href: "/legal-notice" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Opt-out & Privacy Request", href: "/opt-out" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-berry-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-bold text-ink-900">WazzaBerry</span>
            </div>
            <p className="mt-3 text-sm text-ink-600">Your AI GTM team.</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-900">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-600 transition hover:text-berry-600"
                    >
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-berry-100 pt-6 text-sm text-ink-600">
          © {new Date().getFullYear()} WazzaBerry — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
