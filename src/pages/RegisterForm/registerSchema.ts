import { z } from 'zod';

// Definindo o esquema de validação para o formulário de registro
export const registrationSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(6, 'A confirmação da senha deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'], // Indica onde o erro ocorrerá
  });
