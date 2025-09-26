import Portfolio from '@/components/Portfolio';
import WorkSection from '@/components/sections/WorkSection';
import SimpleAboutSection from '@/components/sections/SimpleAboutSection';

export default function HomePage() {
  return (
    <>
      <Portfolio />
      <WorkSection />
      <SimpleAboutSection />
    </>
  );
}