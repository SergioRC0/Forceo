import { z } from 'zod';

export const loginSchema = z.object({
  emailOrUsername: z
    .string({ required_error: 'Campo obligatorio' })
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(25, { message: 'Máximo 25 caracteres' }),
  password: z
    .string()
    .min(6, { message: 'Campo obligatorio' })
    .max(15, { message: 'Max 15 caracteres' }),
});
