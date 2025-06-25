import { PersonalizedDashboard } from '@/components/onboarding/PersonalizedDashboard';

// Demo data representing a completed onboarding profile
const demoProfile = {
  id: 'demo-user',
  name: 'Alex',
  surname: 'Thompson',
  companyName: 'GreenTech Solutions',
  companyDescription:
    'A SaaS platform helping businesses track and reduce their carbon footprint through AI-powered analytics.',
  userType: 'founder' as const,
  companyStage: 'seed' as const,
  companySize: '11-50' as const,
  primaryIndustry: 'CleanTech',
  geographicFocus: ['Germany', 'France', 'Netherlands', 'Sweden'],
  businessModel: 'saas' as const,
  regulatoryComplexity: 'medium' as const,
  keyRegulatoryAreas: [
    'Environmental Regulations',
    'GDPR & Data Protection',
    'Digital Services Act (DSA)',
    'AI Regulation',
  ],
  topicList: ['sustainability', 'carbon tracking', 'environmental compliance'],
  newsletterFrequency: 'weekly' as const,
  onboardingCompleted: true,
};

export default function OnboardingDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">🎉 Onboarding Complete!</h1>
            <p className="text-muted-foreground text-lg">
              This is how your personalized OpenEU experience looks based on
              your preferences
            </p>
          </div>

          <PersonalizedDashboard profile={demoProfile} />

          <div className="mt-12 text-center">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">💡 What happens next?</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  ✅ Your profile has been saved and will personalize your
                  entire OpenEU experience
                </p>
                <p>
                  ✅ All features (Chat, Calendar, Monitor, Inbox) now show
                  content relevant to your business
                </p>
                <p>
                  ✅ You can update your preferences anytime in your profile
                  settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
