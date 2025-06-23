export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row justify-center items-center w-full pt-10">
      <div className="grid gap-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage you profile details, company details, interesting company &
            topics here.
          </p>
        </div>
        <div className="flex flex-col gap-4 pt-3">{children}</div>
      </div>
    </div>
  );
}
