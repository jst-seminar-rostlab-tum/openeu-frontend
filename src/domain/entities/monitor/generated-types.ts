/**
 * Auto-generated monitor types extracted from OpenAPI specification
 * Run `npm run api:update` to regenerate
 */

// Import the auto-generated types
import type { components, operations } from '@/lib/api-types';

// === API TYPES (truly generated) ===
export type LegislativeFilesParams =
  operations['get_legislative_files_legislative_files_get']['parameters']['query'];
export type LegislativeSuggestionsParams =
  operations['get_legislation_suggestions_legislative_files_suggestions_get']['parameters']['query'];
export type LegislativeFileParams =
  operations['get_legislative_file_legislative_file_get']['parameters']['query'];

export type LegislativeFilesResponse =
  components['schemas']['LegislativeFilesResponse'];
export type LegislativeFileResponse =
  components['schemas']['LegislativeFileResponse'];
export type LegislativeFileSuggestionResponse =
  components['schemas']['LegislativeFileSuggestionResponse'];

export type LegislativeFile = components['schemas']['LegislativeFile'];
export type LegislativeFileSuggestion =
  components['schemas']['LegislativeFileSuggestion'];
