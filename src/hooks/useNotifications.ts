import { useContext } from 'react';

import type { INotificationContext } from '@/types/notification';

import { NotificationContext } from '@/contexts/NotificationContext';

export const useNotifications = (): INotificationContext => {
  const { notifications, removeNotification, addNotification } = useContext(NotificationContext);

  return { notifications, removeNotification, addNotification };
};
