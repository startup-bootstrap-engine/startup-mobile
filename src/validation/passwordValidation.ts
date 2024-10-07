export const passwordValidator = (value: string): boolean => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const isLongEnough = value.length >= 8;
  
    return hasUppercase && hasLowercase && hasNumber && isLongEnough;
  };
  