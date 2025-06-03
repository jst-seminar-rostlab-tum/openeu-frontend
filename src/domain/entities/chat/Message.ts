export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  session_id?: number;
  author?: 'user' | 'assistant';
}
