import { ITransaction } from '@/features/transactions/types';

const initTransaction: ITransaction = {
  account: 'PL12312312312312312312312312',
  date: new Date().toISOString(),
  beneficiary: 'John Doe',
  amount: 123,
  address: '783 Robert Street, Brenton, Guam, 3488',
  description: 'Ea nulla adipisicing ad sit eiusmod eu irure culpa nulla quis quis quis.',
  id: 1
};

export const transactionFactory = (transaction?: Partial<ITransaction>): ITransaction =>
  ({
    ...initTransaction,
    ...transaction
  } satisfies ITransaction);
