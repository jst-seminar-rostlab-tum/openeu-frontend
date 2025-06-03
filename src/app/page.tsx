import FeaturesSection from '@/components/FeaturesSection/FeaturesSection';
import HeroSection from '@/components/HeroSection/HeroSection';
import MissionSection from '@/components/MissionSection/MissionSection';

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <HeroSection />
      <FeaturesSection />
      <MissionSection />
    </main>
  );
}
