import FeaturesSection from '@/components/home/FeaturesSection';
import Footer from '@/components/home/Footer';
import HeroSection from '@/components/home/HeroSection';
import LoggedInLanding from '@/components/home/LoggedInLanding';
import MissionSection from '@/components/home/MissionSection';
import { verifySession } from '@/lib/dal';

export default async function HomePage() {
  const session = await verifySession();

  if (session) {
    return <LoggedInLanding user={session.user} />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <HeroSection />
      <FeaturesSection />
      <MissionSection />
      <Footer />
    </main>
  );
}
