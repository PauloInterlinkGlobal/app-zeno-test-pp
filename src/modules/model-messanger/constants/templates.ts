import { SelectOption } from '@/core/components/Select';

export const TEMPLATE_CATEGORIES: SelectOption[] = [
  { value: '', label: 'Todas as categorias' },
  { value: 'promocional', label: 'Promocional' },
  { value: 'transacional', label: 'Transacional' },
  { value: 'notificacao', label: 'Notificação' },
  { value: 'cobranca', label: 'Cobrança' },
];

export const TEMPLATE_SORT_OPTIONS: SelectOption[] = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'variables', label: 'Nº de Variáveis' },
];

export const CATEGORY_BADGE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  promocional: {
    label: 'PROMOCIONAL',
    className:
      'bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 border-primary-200 dark:border-primary-800',
  },
  transacional: {
    label: 'TRANSACIONAL',
    className:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  notificacao: {
    label: 'NOTIFICAÇÃO',
    className:
      'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  cobranca: {
    label: 'COBRANÇA',
    className:
      'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  },
};
