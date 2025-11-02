import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email("Niepoprawny format email"),
    password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków")
})

export type RegisterBody = z.infer<typeof registerSchema>;