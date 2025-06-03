export interface ChatSession {
  id: number;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSessionRequest {
  title: string;
  user_id: string;
}

export interface SendMessageRequest {
  session_id: number;
  message: string;
}
