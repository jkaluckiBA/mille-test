import type { ReactElement } from 'react';

import { Footer, NavBar } from '@/components/common';
import Transactions from '@/pages/Transactions';

import classes from './App.module.scss';

const App = (): ReactElement => {
  return (
    <div className={classes.app}>
      <NavBar />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
