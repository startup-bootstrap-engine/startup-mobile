import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from './useDebounce';
import { describe, it, expect, vi } from 'vitest';

vi.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should not update the debounced value before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Fast-forward time by less than the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');
  });

  it('should reset the timer if the value changes before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    // Update the value
    rerender({ value: 'updated1', delay: 500 });

    // Fast-forward time by less than the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Update the value again
    rerender({ value: 'updated2', delay: 500 });

    // Fast-forward time by less than the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');

    // Fast-forward time to complete the delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('updated2');
  });
});
