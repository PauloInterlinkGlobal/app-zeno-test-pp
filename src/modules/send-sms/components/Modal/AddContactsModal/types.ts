import { IContact } from '@/modules/contacts/interfaces/contacts';

export interface SelectContactsModalProps {
  contacts: IContact[];
  selected: string[];
  onConfirm: (numbers: string[]) => void;
}
