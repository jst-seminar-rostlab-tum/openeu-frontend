import { Message } from '@/domain/entities/chat/Message';

// Re-export for backward compatibility
export type { Message };

// Note: This class is now a compatibility layer.
// For new code, use the hooks directly from @/domain/hooks/chat-hooks
export default class ChatOperations {
  static handleAddFile(): void {
    console.log('Add file functionality - to be implemented');
  }

  static handleSettings(): void {
    console.log('Settings functionality - to be implemented');
  }
}
