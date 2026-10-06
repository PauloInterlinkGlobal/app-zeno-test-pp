import { SelectOption } from '@/core/components/Select';

export const SECTORS: SelectOption[] = [
  { value: 'tecnologia', label: 'Tecnologia & Software' },
  { value: 'financeiro', label: 'Banca & Serviços Financeiros' },
  { value: 'saude', label: 'Saúde & Farmacêutica' },
  { value: 'comercio', label: 'Comércio & E-commerce' },
  { value: 'educacao', label: 'Educação & Formação' },
  { value: 'logistica', label: 'Logística & Transportes' },
  { value: 'outro', label: 'Outro' },
];

export const COMPANY_SIZES: SelectOption[] = [
  { value: '1-10', label: '1 - 10 colaboradores' },
  { value: '11-50', label: '11 - 50 colaboradores' },
  { value: '51-200', label: '51 - 200 colaboradores' },
  { value: '201+', label: 'Mais de 200 colaboradores' },
];
