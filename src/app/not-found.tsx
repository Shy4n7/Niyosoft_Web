import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-grid">
      <div className="mx-auto max-w-6xl px-4 py-32 text-center sm:px-6">
        <p className="font-display text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-navy">Page not found</h1>
        <Link href="/" className="bg-brand-gradient mt-8 inline-flex rounded-full px-7 py-3 font-semibold text-white">Back to home</Link>
      </div>
    </section>
  );
}
