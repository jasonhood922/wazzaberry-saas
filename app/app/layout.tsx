import Link from "next/link";
import Logo from "@/components/Logo";
import SidebarNav from "./SidebarNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-berry-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-bold text-ink-900">WazzaBerry</span>
            <span className="ml-2 rounded-full bg-berry-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-berry-700">
              Demo — sample data
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-ink-600 hover:text-berry-600"
          >
            ← Back to site
          </Link>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <SidebarNav />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
