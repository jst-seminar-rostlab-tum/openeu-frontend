export type InboxItem = {
  id: string;
  title: string;
  date: string;
  country: string;
  relevanceScore: number | undefined;
  message: string | null;
};
