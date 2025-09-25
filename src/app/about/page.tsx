import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';

export default function AboutPage() {
  return (
    <>
      <PortfolioNavigation />
      <div className="min-h-screen bg-black text-white/92 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">About</h1>
          <p className="text-white/65">Coming soon...</p>
        </div>
      </div>
    </>
  );
}