import Decimal from 'decimal.js';

import type { ITransaction } from '@/features/transactions/types';

export const generateTransactionId = (transactions: ITransaction[]): number => {
  if (!transactions.length) return 0;
  return Math.max(...transactions.map(({ id }) => id)) + 1;
};

export const sortTransactionsByDate = (a: ITransaction, b: ITransaction): -1 | 0 | 1 => {
  if (a.date < b.date) return 1;
  if (a.date > b.date) return -1;
  return 0;
};

export const calculateTransactionsBalance = (transactions: ITransaction[]): number =>
  Number(
    transactions
      ?.reduce<Decimal>((acc, transaction) => acc.plus(transaction.amount), new Decimal(0))
      .toFixed(2)
  ) ?? 0;
