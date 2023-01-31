import { createContext, useCallback, useMemo, useState } from 'react';

import type { ReactElement, ReactNode } from 'react';
import type { INotification, INotificationContext } from '@/types/notification';

const NotificationContext = createContext<INotificationContext>({
  addNotification: () => {
    throw new Error('Method uninitialized');
  },
  notifications: [],
  removeNotification: () => {
    throw new Error('Method uninitialized');
  }
});

interface INotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider = ({ children }: INotificationProviderProps): ReactElement => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const removeNotification = useCallback<INotificationContext['removeNotification']>((id) => {
    setNotifications((prevState) =>
      [...prevState].filter((notification) => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback<INotificationContext['addNotification']>((message, type) => {
    setNotifications((prevState) => {
      const newState = [...prevState];
      const lastId = Math.max(...newState.map((notification) => notification.id));
      const id = lastId > 0 ? lastId + 1 : 1;
      newState.push({
        id,
        message,
        type
      });
      return newState;
    });
  }, []);

  const contextValue = useMemo<INotificationContext>(
    () => ({
      removeNotification,
      notifications,
      addNotification
    }),
    [addNotification, notifications, removeNotification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
