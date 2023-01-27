import type { ReactElement } from 'react';

import classes from './TransactionForm.module.scss';

const TransactionForm = (): ReactElement => {
  return <div className={classes.form}>New Transaction Form</div>;
};

export { TransactionForm };
