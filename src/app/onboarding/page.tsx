import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  // Redirect to the first step of the new onboarding flow
  redirect('/onboarding/1');
}
