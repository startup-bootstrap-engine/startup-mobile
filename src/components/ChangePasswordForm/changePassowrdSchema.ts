import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'A senha atual deve ter no mínimo 6 caracteres'),
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
    newPasswordConfirmation: z
      .string()
      .min(6, 'A confirmação da nova senha deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['newPasswordConfirmation'],
  });
