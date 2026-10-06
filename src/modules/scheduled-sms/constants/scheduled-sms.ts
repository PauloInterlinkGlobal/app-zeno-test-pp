import { SendingType } from '@/modules/scheduled-sms/interfaces/scheduled-sms';

export const sendingTypeLabel: Record<SendingType, string> = {
  normal: 'Normal',
  flash: 'Flash',
};

export const ALL = 'all';
