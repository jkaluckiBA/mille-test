export type NotificationId = number;
export type NotificationType = 'success' | 'warn' | 'error';

export interface INotification {
  type: NotificationType;
  message: string;
  id: NotificationId;
}

export interface INotificationContext {
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: NotificationId) => void;
  notifications: INotification[];
}
