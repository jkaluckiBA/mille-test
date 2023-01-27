import type { ReactElement } from 'react';

import {
  Balance,
  TransactionForm,
  TransactionList,
  TransactionsFilter
} from '@/components/transactions';

import classes from './Transactions.module.scss';

const Transactions = (): ReactElement => {
  return (
    <main className={classes.transactionsRoot}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Balance />
          <TransactionsFilter />
        </div>
        <TransactionForm />
      </div>
      <TransactionList />
    </main>
  );
};

export default Transactions;
