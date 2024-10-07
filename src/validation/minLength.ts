export const minLength = (min: number) => (value: string): string | null => {
    return value.length >= min ? null : `O valor deve ter pelo menos ${min} caracteres`;
  };
  