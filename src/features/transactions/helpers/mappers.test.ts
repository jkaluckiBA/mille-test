import { describe, expect, it } from 'vitest';

import type { ITransaction, ITransactionDTO } from '@/features/transactions/types';

describe('mapTransactionDto', () => {
  it('should map dto to ITransaction object', () => {
    const dto: ITransactionDTO = {
      account: 'account',
      id: 1,
      address: 'address',
      amount: 123,
      date: new Date().toISOString(),
      beneficiary: 'Test',
      description: 'description test'
    };
    expect(dto).toEqual({
      account: 'account',
      id: 1,
      address: 'address',
      amount: 123,
      date: new Date().toISOString(),
      beneficiary: 'Test',
      description: 'description test'
    } satisfies ITransaction);
  });
});
