import SampleComponent from '@/components/SampleCard/SampleComponent';

export default function HomePage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to OpenEU 👋</h1>
      <SampleComponent
        title="Sample Card Title"
        description="This is a description for the sample card."
      />
    </main>
  );
}
