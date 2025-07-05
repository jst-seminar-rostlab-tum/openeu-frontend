export type Alert = {
  id: string;
  description: string;
  created_at: string | null;
  relevancy_threshold: number;
  is_active: boolean;
};
