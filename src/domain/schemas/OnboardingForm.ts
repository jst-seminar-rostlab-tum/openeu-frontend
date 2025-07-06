import { z } from 'zod';

// Base field validations
const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long');
const nameSchema = z.string().min(2, 'Name must be at least 2 characters long');

// Step 1: Registration Schema
export const registrationSchema = z.object({
  name: nameSchema,
  surname: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Step 2: Path Decision Schema
export const pathDecisionSchema = z.object({
  userCategory: z.enum(['entrepreneur', 'politician'], {
    required_error: 'Please select your user category',
  }),
});

// Step 3: Role Details Schemas (split by user category)
export const entrepreneurRoleSchema = z.object({
  userType: z.enum(
    ['founder', 'startup_employee', 'consultant', 'investor', 'other'],
    {
      required_error: 'Please select your role type',
    },
  ),
  companyName: z.string().min(1, 'Company name is required'),
  companyStage: z.enum(
    [
      'idea',
      'pre_seed',
      'seed',
      'series_a',
      'series_b',
      'growth',
      'established',
    ],
    {
      required_error: 'Please select your company stage',
    },
  ),
  companySize: z.enum(['1', '2-10', '11-50', '51-200', '200+'], {
    required_error: 'Please select your company size',
  }),
  primaryIndustry: z.string().min(1, 'Primary industry is required'),
  businessModel: z.enum(
    ['b2b', 'b2c', 'b2b2c', 'marketplace', 'saas', 'hardware', 'other'],
    {
      required_error: 'Please select your business model',
    },
  ),
  regulatoryComplexity: z.enum(['low', 'medium', 'high'], {
    required_error: 'Please select regulatory complexity',
  }),
  companyDescription: z
    .string()
    .min(10, 'Please provide a description of at least 10 characters'),
});

export const politicianRoleSchema = z.object({
  politicalRole: z.enum(
    [
      'mep',
      'national_mp',
      'local_representative',
      'policy_advisor',
      'civil_servant',
      'other',
    ],
    {
      required_error: 'Please select your political role',
    },
  ),
  institution: z.string().min(1, 'Institution is required'),
  politicalParty: z.string().optional(),
  areaOfExpertise: z
    .array(z.string())
    .min(1, 'Please select at least one area of expertise'),
  companyDescription: z
    .string()
    .min(10, 'Please provide a description of at least 10 characters'),
});

// Step 4: Focus Area Schema
export const focusAreaSchema = z.object({
  topicList: z
    .array(z.string())
    .min(1, 'Please select at least one topic of interest'),
  geographicFocus: z
    .array(z.string())
    .min(1, 'Please select at least one geographic focus'),
  keyRegulatoryAreas: z
    .array(z.string())
    .min(1, 'Please select at least one regulatory area'),
});

// Step 5: Completion Schema
export const completionSchema = z.object({
  newsletterFrequency: z.enum(['daily', 'weekly', 'none'], {
    required_error: 'Please select your notification frequency',
  }),
});

// Combined schemas for different user paths
export const entrepreneurCompleteSchema = registrationSchema
  .merge(pathDecisionSchema)
  .merge(entrepreneurRoleSchema)
  .merge(focusAreaSchema)
  .merge(completionSchema)
  .extend({
    id: z.string(),
    onboardingCompleted: z.boolean(),
    // Make politician-specific fields optional for entrepreneurs
    politicalRole: z
      .enum([
        'mep',
        'national_mp',
        'local_representative',
        'policy_advisor',
        'civil_servant',
        'other',
      ])
      .optional(),
    institution: z.string().optional(),
    politicalParty: z.string().optional(),
    areaOfExpertise: z.array(z.string()).optional(),
  });

export const politicianCompleteSchema = registrationSchema
  .merge(pathDecisionSchema)
  .merge(politicianRoleSchema)
  .merge(focusAreaSchema)
  .merge(completionSchema)
  .extend({
    id: z.string(),
    onboardingCompleted: z.boolean(),
    // Make entrepreneur-specific fields optional for politicians
    userType: z
      .enum(['founder', 'startup_employee', 'consultant', 'investor', 'other'])
      .optional(),
    companyName: z.string().optional(),
    companyStage: z
      .enum([
        'idea',
        'pre_seed',
        'seed',
        'series_a',
        'series_b',
        'growth',
        'established',
      ])
      .optional(),
    companySize: z.enum(['1', '2-10', '11-50', '51-200', '200+']).optional(),
    primaryIndustry: z.string().optional(),
    businessModel: z
      .enum(['b2b', 'b2c', 'b2b2c', 'marketplace', 'saas', 'hardware', 'other'])
      .optional(),
    regulatoryComplexity: z.enum(['low', 'medium', 'high']).optional(),
  });

// Dynamic schema that adapts based on user category
export const createProfileSchema = (
  userCategory: 'entrepreneur' | 'politician',
) => {
  return userCategory === 'entrepreneur'
    ? entrepreneurCompleteSchema
    : politicianCompleteSchema;
};

// Step-by-step validation helpers
export const validateStep = (
  step: number,
  data: unknown,
  userCategory?: 'entrepreneur' | 'politician',
) => {
  switch (step) {
    case 1:
      return registrationSchema.safeParse(data);
    case 2:
      return pathDecisionSchema.safeParse(data);
    case 3:
      if (!userCategory) {
        throw new Error('User category is required for step 3 validation');
      }
      return userCategory === 'entrepreneur'
        ? entrepreneurRoleSchema.safeParse(data)
        : politicianRoleSchema.safeParse(data);
    case 4:
      return focusAreaSchema.safeParse(data);
    case 5:
      return completionSchema.safeParse(data);
    default:
      return {
        success: false as const,
        error: {
          issues: [
            {
              code: 'custom' as const,
              message: 'Invalid step number',
              path: [],
            },
          ],
        },
      };
  }
};

// Type inference helpers
export type RegistrationData = z.infer<typeof registrationSchema>;
export type PathDecisionData = z.infer<typeof pathDecisionSchema>;
export type EntrepreneurRoleData = z.infer<typeof entrepreneurRoleSchema>;
export type PoliticianRoleData = z.infer<typeof politicianRoleSchema>;
export type FocusAreaData = z.infer<typeof focusAreaSchema>;
export type CompletionData = z.infer<typeof completionSchema>;
export type EntrepreneurCompleteData = z.infer<
  typeof entrepreneurCompleteSchema
>;
export type PoliticianCompleteData = z.infer<typeof politicianCompleteSchema>;

// Utility function to get all validation errors for a step
export const getStepErrors = (
  step: number,
  data: unknown,
  userCategory?: 'entrepreneur' | 'politician',
) => {
  const result = validateStep(step, data, userCategory);
  if (!result.success) {
    return result.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path.join('.');
        acc[field] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );
  }
  return {};
};

// Check if step is valid
export const isStepValid = (
  step: number,
  data: unknown,
  userCategory?: 'entrepreneur' | 'politician',
) => {
  const result = validateStep(step, data, userCategory);
  return result.success;
};
