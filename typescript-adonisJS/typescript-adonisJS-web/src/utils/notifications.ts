import { MapErrorToState } from '@store/types';
import { notification } from 'antd';

export function errorNotification(message: string, error: MapErrorToState): void {
    notification.error({
      message,
      description: error?.message || error.errors?.map((v) => v.message).join('\n'),
    });
}
  
  export function successNotification(message: string, description?: string): void {
    notification.success({
      message,
      description,
    });
}