import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { DEFAULT_DEBOUNCE_DELAY } from '@/features/transactions/constants';

export const useDebouncedValue = <T>(
  initialValue: T,
  delay = DEFAULT_DEBOUNCE_DELAY
): [debouncedValue: T, setValue: (value: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue] = useDebounce(value, delay);
  return [debouncedValue, setValue];
};
