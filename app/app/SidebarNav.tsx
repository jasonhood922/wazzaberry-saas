"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Warm leads", href: "/app", icon: "🔥" },
  { label: "Campaigns", href: "/app/campaigns", icon: "🚀" },
  { label: "Inbox", href: "/app/inbox", icon: "✉️" },
  { label: "Agent setup", href: "/app/onboarding", icon: "🪄" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-52 shrink-0 md:block">
      <nav className="sticky top-6 space-y-1">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white text-berry-700 shadow-sm ring-1 ring-berry-100"
                  : "text-ink-600 hover:bg-white/60 hover:text-ink-900"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
