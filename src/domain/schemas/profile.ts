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
  topic_list: z.array(z.string()),
});
