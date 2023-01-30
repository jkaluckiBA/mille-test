import type { ReactElement } from 'react';

import classes from './TransactionListHeader.module.scss';

export const TransactionListHeader = (): ReactElement => {
  return (
    <div className={classes.header}>
      <span>Date</span>
      <span>Transaction Info</span>
      <span>Amount</span>
    </div>
  );
};
