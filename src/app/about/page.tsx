import { Navigation } from '@/components/ui/Navigation';

export default function AboutPage() {
  return (
    <>
      <Navigation className="fixed top-4 left-4 right-4 z-[200] max-w-none" />
      <div className="min-h-screen bg-black text-white/92 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">About</h1>
          <p className="text-white/65">Coming soon...</p>
        </div>
      </div>
    </>
  );
}