import SampleComponent from '@/components/SampleCard/SampleComponent';
import { Button } from '@/components/ui/button';
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to OpenEU 👋</h1>
      <SampleComponent
        title="Sample Card Title"
        description="This is a description for the sample card."
      />
    </main>
  );
}
