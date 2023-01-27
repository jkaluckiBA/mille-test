import type { ReactElement } from 'react';

import classes from './TransactionFilter.module.scss';

const TransactionsFilter = (): ReactElement => {
  return <div className={classes.filter}>Transactions Filter</div>;
};

export { TransactionsFilter };
