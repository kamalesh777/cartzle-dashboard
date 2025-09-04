import { notification } from 'antd'

import type { NotificationPlacement } from 'antd/es/notification/interface'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const openNotificationWithIcon = (
  type: NotificationType,
  description: string,
  className?: string,
  placement?: NotificationPlacement,
): void => {
  notification[type]({
    message: '',
    description,
    className: `notify-box ${className ?? ''}`,
    placement: placement ?? 'top',
    pauseOnHover: true,
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Toast = (
  type: NotificationType,
  description: string,
  className?: string,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  placement?: NotificationPlacement,
) => {
  openNotificationWithIcon(type, description, className, placement)
}

export default Toast
