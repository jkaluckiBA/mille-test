import type { ReactElement } from 'react';

import classes from './TransactionList.module.scss';

const TransactionList = (): ReactElement => {
  return <div className={classes.list}>Transaction List</div>;
};

export { TransactionList };
