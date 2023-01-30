import type { ITransaction, ITransactionDTO } from '@/features/transactions/types';

export const mapTransactionDto = (dto: ITransactionDTO): ITransaction => ({
  account: dto.account,
  address: dto.address,
  amount: dto.amount,
  date: new Date(dto.date).toISOString(),
  beneficiary: dto.beneficiary,
  description: dto.description,
  id: dto.id
});
