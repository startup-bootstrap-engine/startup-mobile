export const required = (fieldName: string) => (value: string): boolean => {
    return value.trim() !== '';
  };
    