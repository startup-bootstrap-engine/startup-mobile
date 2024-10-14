import { z } from 'zod';

export const registrationSchema = z
  .object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    passwordConfirmation: z
      .string()
      .min(6, 'A senha de confirmação deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas devem coincidir',
    path: ['passwordConfirmation'], // Coloca o erro no campo de confirmação de senha
  });
