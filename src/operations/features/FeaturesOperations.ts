import CalendarOperations, { type CalendarEvent } from './CalendarOperations';
import ChatOperations, { type ChatMessage } from './ChatOperations';
import NotificationOperations, {
  type Notification,
} from './NotificationOperations';

export default class FeaturesOperations {
  // Chat operations
  static getChatMessages = ChatOperations.getChatMessages;
  static generateMockAIResponse = ChatOperations.generateMockAIResponse;
  static createChatMessage = ChatOperations.createChatMessage;

  // Notification operations
  static getInboxNotifications = NotificationOperations.getInboxNotifications;
  static filterNotificationsByType =
    NotificationOperations.filterNotificationsByType;
  static getNotificationCounts = NotificationOperations.getNotificationCounts;

  // Calendar operations
  static getCalendarEvents = CalendarOperations.getCalendarEvents;
  static getEventsForDate = CalendarOperations.getEventsForDate;
  static hasEventOnDate = CalendarOperations.hasEventOnDate;
  static getEventTypeForDate = CalendarOperations.getEventTypeForDate;
}

export type { CalendarEvent, ChatMessage, Notification };
export { CalendarOperations, ChatOperations, NotificationOperations };
