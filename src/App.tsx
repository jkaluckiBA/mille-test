import type { ReactElement } from 'react';

import { Footer, NavBar, NotificationsContainer } from '@/components';
import { NotificationProvider } from '@/contexts/NotificationContext';
import Transactions from '@/pages/Transactions';

import classes from './App.module.scss';

const App = (): ReactElement => {
  return (
    <div className={classes.app}>
      <NotificationProvider>
        <NavBar />
        <Transactions />
        <Footer />
        <NotificationsContainer />
      </NotificationProvider>
    </div>
  );
};

export default App;
