import { useMemo } from 'react';

import type { ReactElement } from 'react';
import type { ITransaction } from '@/features/transactions/types';

import { joinClasses } from '@/helpers/utils';

import classes from './TransactionListItem.module.scss';

interface IProps {
  transaction: ITransaction;
}

export const TransactionListItem = ({ transaction }: IProps): ReactElement => {
  const transactionDate = useMemo<string>(() => {
    const date = new Date(transaction.date);
    return `${date.toLocaleDateString()}`;
  }, [transaction.date]);

  return (
    <div className={classes.item}>
      <div>{transactionDate}</div>
      <div className={classes.transferInfo}>
        <div className={classes.beneficiaryInfo}>
          {transaction.beneficiary}, {transaction.address}
        </div>
        <div className={classes.account}>{transaction.account}</div>
        <div className={classes.description}>{transaction.description}</div>
      </div>
      <div className={joinClasses(classes.amount, transaction.amount > 0 ? classes.received : '')}>
        {transaction.amount.toFixed(2)}
      </div>
    </div>
  );
};
