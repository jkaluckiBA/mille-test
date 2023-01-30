import type { ITransaction, ITransactionDTO } from '@/features/transactions/types';

import { get } from '@/api';
import { mapTransactionDto } from '@/features/transactions/helpers';

export const getTransactions = async (): Promise<ITransaction[]> => {
  const dtos = await get<ITransactionDTO[]>('/transactions');
  return dtos.data.map<ITransaction>(mapTransactionDto);
};
