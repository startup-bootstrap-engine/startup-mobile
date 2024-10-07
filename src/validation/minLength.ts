export const minLength = (min: number) => {
    return (value: string): boolean => {
      return value.length >= min;
    };
  };
  