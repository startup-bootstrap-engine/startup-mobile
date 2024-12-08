import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';

interface ICounterHook {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Example custom hook
const useCounter = (initialValue = 0): ICounterHook => {
  const [count, setCount] = useState(initialValue);
  const increment = (): void => setCount((prev) => prev + 1);
  const decrement = (): void => setCount((prev) => prev - 1);
  return { count, increment, decrement };
};

describe('Hook Testing Example', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  it('should use initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
