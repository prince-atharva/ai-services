import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string()
    .min(3, { message: 'Email must be at least 3 characters' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const loginSchema = z.object({
  email: z.string()
    .min(3, { message: 'Email must be at least 3 characters' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string()
    .min(3, { message: 'Email must be at least 3 characters' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type UserInput = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const validateBody = <T>(schema: z.ZodSchema<T>) => {
  return async (request: Request): Promise<T> => {
    const body = await request.json();
    return schema.parse(body);
  };
};