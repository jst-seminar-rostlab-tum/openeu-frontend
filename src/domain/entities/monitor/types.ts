import { SUPPORTED_CONTEXT_TYPES } from '@/operations/chat/ChatOperations';

export type TContext = (typeof SUPPORTED_CONTEXT_TYPES)[number];
