import MeetingList from '@/components/MeetingList.tsx/MeetingList';
import SampleComponent from '@/components/SampleCard/SampleComponent';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-300">
        Welcome to OpenEU 👋
      </h1>
      <SampleComponent
        title="Sample Card Title"
        description="This is a description for the sample card."
      />

      <MeetingList />

    </main>
  );
}
