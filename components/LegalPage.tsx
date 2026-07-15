import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <section className="px-4 py-16 sm:px-6">
        <div className="prose-berry mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">
            {title}
          </h1>
          {updated && (
            <p className="mt-2 text-sm text-ink-600">Last updated: {updated}</p>
          )}
          <div className="mt-8 space-y-6 text-ink-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
