import type { ITransaction, ITransactionDTO } from '@/features/transactions/types';

import { get } from '@/api';

export const getTransactions = async (): Promise<ITransaction[]> => {
  const dtos = await get<ITransactionDTO[]>('/transactions');
  const transactions = dtos.data.map<ITransaction>((dto) => ({
    account: dto.account,
    address: dto.address,
    amount: dto.amount,
    date: dto.date,
    beneficiary: dto.beneficiary,
    description: dto.description,
    id: dto.id
  }));
  transactions.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
  return transactions;
};
