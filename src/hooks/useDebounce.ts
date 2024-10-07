import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Cria um timer que será reiniciado sempre que o valor mudar
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Atualiza o valor após o delay
    }, delay);

    // Limpa o timer se o efeito for chamado novamente antes do tempo expirar
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue; // Retorna o valor atualizado apenas após o debounce
};
