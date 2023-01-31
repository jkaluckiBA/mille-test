import { describe, expect, it } from 'vitest';

import {
  calculateTransactionsBalance,
  generateTransactionId,
  sortTransactionsByDate
} from '@/features/transactions/helpers/utils';
import { transactionFactory } from '@/features/transactions/_mock/factories/transaction';

describe('generateTransactionId', () => {
  it('should generate ID basing on existing entities', () => {
    const result = generateTransactionId([
      transactionFactory({ id: 1 }),
      transactionFactory({ id: 2 }),
      transactionFactory({ id: 3 }),
      transactionFactory({ id: 4 }),
      transactionFactory({ id: 5 }),
      transactionFactory({ id: 6 }),
      transactionFactory({ id: 7 })
    ]);

    expect(result).toEqual(8);
  });
});

describe('sortTransactionsByDate', () => {
  it('should sort transactions desc by date', () => {
    const transactions = [
      transactionFactory({ date: '2016-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2023-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2018-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2019-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2021-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2022-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2017-01-31T02:48:09.103Z' })
    ];
    const result = [...transactions].sort(sortTransactionsByDate);

    expect(result).toEqual([
      transactionFactory({ date: '2023-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2022-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2021-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2019-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2018-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2017-01-31T02:48:09.103Z' }),
      transactionFactory({ date: '2016-01-31T02:48:09.103Z' })
    ]);
  });
});

describe('calculateTransactionsBalance', () => {
  it('should calculate transaction balance of given transactions', () => {
    const transactions = [
      transactionFactory({ amount: 1.1 }),
      transactionFactory({ amount: 2.1 }),
      transactionFactory({ amount: 3.1 }),
      transactionFactory({ amount: 4.1 }),
      transactionFactory({ amount: 5.11 }),
      transactionFactory({ amount: 6 }),
      transactionFactory({ amount: -6 })
    ];

    const result = calculateTransactionsBalance(transactions);

    expect(result).toEqual(15.51);
  });
});
