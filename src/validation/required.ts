export const required =
  (fieldName: string) =>
  (value: string | null): string | null => {
    return value ? null : `${fieldName} é obrigatório`;
  };
