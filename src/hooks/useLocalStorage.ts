import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@capacitor/storage';

type StorageValue<T> = T | null;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const isNative = Capacitor.isNativePlatform();

  const readValue = async (): Promise<StorageValue<T>> => {
    if (isNative) {
      try {
        const { value } = await Storage.get({ key });
        return value ? JSON.parse(value) : initialValue;
      } catch (error) {
        console.warn(`Error reading Capacitor Storage key "${key}":`, error);
        return initialValue;
      }
    } else {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return initialValue;
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const writeValue = async (value: T) => {
    if (isNative) {
      try {
        await Storage.set({
          key,
          value: JSON.stringify(value),
        });
      } catch (error) {
        console.warn(`Error setting Capacitor Storage key "${key}":`, error);
      }
    } else {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.warn(`Error setting localStorage key "${key}":`, error);
        }
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setValueHandler = async (newValue: T) => {
    try {
      setStoredValue(newValue);
      await writeValue(newValue);
    } catch (error) {
      console.warn(`Error setting value for key "${key}":`, error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const initializeValue = async () => {
      try {
        const value = await readValue();
        setStoredValue(value !== null ? value : initialValue);
      } catch (error) {
        console.error('Error to initialize value:', error);
        setStoredValue(initialValue);
      }
    };

    initializeValue().catch((error) => {
      console.error('Error during initialization:', error);
      setStoredValue(initialValue);
    });
  }, [key, initialValue]);

  return [storedValue, setValueHandler];
}
