import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import MissionSection from '@/components/home/MissionSection';

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <HeroSection />
      <FeaturesSection />
      <MissionSection />
    </main>
  );
}
