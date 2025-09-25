import { Hero } from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Placeholder for additional sections */}
      <section className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-light mb-6 text-white/90 [data-theme='light']:text-black/90">
            More Sections Coming Soon
          </h2>
          <p className="text-lg text-white/70 [data-theme='light']:text-black/70">
            This is just the foundation. The beautiful architecture is in place—now we'll build
            the rest of your portfolio with clean, maintainable components.
          </p>
        </div>
      </section>
    </>
  );
}