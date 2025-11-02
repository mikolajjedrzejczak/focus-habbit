import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Niepoprawny format email!'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków!'),
});

export type RegisterBody = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Niepoprawny format email!'),
  password: z.string().min(8, 'Hasło jest wymagane!'),
});

export type LoginBody = z.infer<typeof loginSchema>;
