import { z } from 'zod';

export const accountDetailsSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  company_name: z.string().min(2),
  company_description: z.string().min(2),
});

const passwordTooShortError = {
  message: 'The password must contain at least 8 character(s).',
};
const passwordTooLongError = {
  message: 'The password must contain at most 32 character(s).',
};

export const securitySchema = z
  .object({
    new_password: z
      .string()
      .min(8, passwordTooShortError)
      .max(32, passwordTooLongError),
    confirm_new_password: z
      .string()
      .min(8, passwordTooShortError)
      .max(32, passwordTooLongError),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "The Passwords don't match",
    path: ['confirm_new_password'],
  });

export const notificationSchema = z.object({
  newsletter_frequency: z.union([
    z.literal('daily'),
    z.literal('weekly'),
    z.literal('none'),
  ]),
});

export const interestsSchema = z.object({
  countries: z.array(z.string()),
  topic_ids: z.array(z.string()),
});

export const pathDecisionSchema = z.object({
  user_type: z.union([z.literal('entrepreneur'), z.literal('politician')]),
});

export const entrepreneurRoleSchema = z.object({
  company: z.object({
    role: z.string().min(1, 'Please select at least one role'),
    name: z.string().min(1, 'Please enter your company name'),
    description: z.string().optional(),
    company_stage: z.string().optional(),
    company_size: z.string().optional(),
    industry: z.string().min(1, 'Primary industry is required'),
  }),
});

export const politicianRoleSchema = z.object({
  politician: z.object({
    role: z.string().min(1, 'Please select at least one role'),
    institution: z.string().optional(),
    area_of_expertise: z.array(z.string()).optional(),
    further_information: z.string().optional(),
  }),
});

export const focusAreaSchema = z.object({
  topicList: z.array(z.string()).min(1, 'Please select at least one topic'),
  geographicFocus: z
    .array(z.string())
    .min(1, 'Please select at least one country'),
});

export const completionSchema = z.object({
  newsletterFrequency: z.union([
    z.literal('daily'),
    z.literal('weekly'),
    z.literal('none'),
  ]),
});
