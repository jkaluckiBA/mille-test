import { useCallback } from 'react';

import type { ReactElement } from 'react';
import type { NotificationType } from '@/types/notification';

import { joinClasses } from '@/helpers/utils';
import { useNotifications } from '@/hooks/useNotifications';

import classes from './NotificationsContainer.module.scss';

const NotificationsContainer = (): ReactElement => {
  const { removeNotification, notifications } = useNotifications();

  const getNotificationTypeClass = useCallback((type: NotificationType) => {
    switch (type) {
      case 'error':
        return classes.error;
      case 'success':
        return classes.success;
      case 'warn':
        return classes.warning;
    }
  }, []);

  return (
    <div className={classes.notificationRoot}>
      {notifications.map((notification) => {
        return (
          <div
            key={notification.id}
            className={joinClasses(
              classes.notification,
              getNotificationTypeClass(notification.type)
            )}
            onClick={() => removeNotification(notification.id)}>
            {notification.message}
          </div>
        );
      })}
    </div>
  );
};

export { NotificationsContainer };
