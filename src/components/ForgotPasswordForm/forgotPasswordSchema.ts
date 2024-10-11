import { z } from 'zod';

// Esquema de validação para o formulário de recuperação de senha
export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});
