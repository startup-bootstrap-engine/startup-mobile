import { useRef, useEffect } from 'react';
import { useFieldStore } from '../store/useFieldStore';
import { useValidationStore } from '../store/useValidationStore';
import { useDebounce } from './useDebounce'; // Importando o hook de debounce

interface UseStoreProps {
  rules: Array<(value: string) => boolean | string>; // Regras de validação podem retornar um boolean ou uma string de erro
  debounceTime?: number; // Tempo de debounce em milissegundos (opcional)
}

export const useStore = ({ rules, debounceTime = 500 }: UseStoreProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setFieldValue, getFieldValue } = useFieldStore();
  const { validateField, getError, setError } = useValidationStore();

  // Obtém o valor do campo da store
  const value = inputRef.current ? getFieldValue(inputRef.current.name) : '';

  // Usa o debounce para retardar a validação
  const debouncedValue = useDebounce(value, debounceTime);

  useEffect(() => {
    if (inputRef.current) {
      const field = inputRef.current.name;

      // Valida o valor apenas após o debounce
      const errorMessage = validateField(field, debouncedValue, rules);

      // Define a mensagem de erro (se houver)
      setError(field, errorMessage);
    }
  }, [debouncedValue]); // O efeito só roda quando o valor "debounced" muda

  // Função para atualizar o valor e validar
  const setValue = (value: string) => {
    if (inputRef.current) {
      const field = inputRef.current.name;
      setFieldValue(field, value); // Atualiza o valor na store de campos
    }
  };

  return {
    inputRef, // Retorna a ref que será usada no componente de input
    setValue, // Função para atualizar o valor do campo
    value, // Retorna o valor atual do campo
    error: inputRef.current ? getError(inputRef.current.name) : '', // Retorna o erro (se houver)
  };
};
