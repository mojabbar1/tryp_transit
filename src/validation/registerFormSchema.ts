import z from 'zod';

export const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Must be a valid name'),
    email: z.string().email('Must be a valid email.'),
    password: z.string().min(1, 'Must be a valid password'),
    confirmPassword: z.string().min(1, 'Must be a valid password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
