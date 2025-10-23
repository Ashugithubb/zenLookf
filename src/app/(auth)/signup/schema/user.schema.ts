import z from "zod";


export const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name can't be empty" }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
    firebase: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });