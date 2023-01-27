import type { ITransaction, ITransactionDTO } from '@/features/transactions/types';

import { get } from '@/api';

export const getTransactions = async (): Promise<ITransaction[]> => {
  const dtos = await get<ITransactionDTO[]>('/transactions');
  return dtos.data.map<ITransaction>((dto) => ({
    account: dto.account,
    address: dto.address,
    amount: dto.amount,
    date: dto.date,
    beneficiary: dto.beneficiary,
    description: dto.description,
    id: dto.id
  }));
};
