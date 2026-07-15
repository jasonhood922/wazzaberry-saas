"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-berry-100/60 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-ink-900">
            WazzaBerry
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-ink-600 transition hover:text-berry-600"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-ink-600 transition hover:text-berry-600"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-berry-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-berry-600/20 transition hover:bg-berry-700"
          >
            Launch my agent free
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-berry-100 bg-cream px-4 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-ink-600"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="mt-3 block rounded-full bg-berry-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Launch my agent free
          </Link>
        </div>
      )}
    </header>
  );
}
