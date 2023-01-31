import { describe, it, expect } from 'vitest';

import { joinClasses } from '@/helpers/utils';

describe('joinClasses', () => {
  it('should successfully join classes', () => {
    const result = joinClasses('class1', 'class2', 'class3');
    expect(result).toEqual('class1 class2 class3');
  });
});
