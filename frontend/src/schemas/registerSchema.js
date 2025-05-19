import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .min(1, { message: 'El email es requerido' })
    .max(25, { message: 'Max 25 carácteres' })
    .email({ message: 'Email inválido' }),
  username: z
    .string()
    .min(3, { message: 'Debe contener al menos 3 caracteres' })
    .max(13, { message: 'Entre 3 y 15 caracteres' }),
  password: z
    .string()
    .min(6, { message: 'Debe contener al menos 6 caracteres' })
    .max(15, { message: 'Entre 6 y 15 caracteres' }),
});
