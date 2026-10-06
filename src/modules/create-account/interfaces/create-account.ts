export type CreateAccountStep = 1 | 2 | 3 | 4;

export interface ICompanyFormData {
  // Task 1: Dados da Empresa
  companyName: string;
  taxId: string;
  address: string;
  sector: string;

  // Task 2: Contactos
  corporateEmail: string;
  phone: string;
  website: string;

  // Task 3: Confirmação de E-mail
  emailCode: string;

  // Task 4: Confirmação de Telefone
  phoneCode: string;
}

export interface ICompanyFormErrors {
  companyName?: string;
  taxId?: string;
  address?: string;
  sector?: string;
  corporateEmail?: string;
  phone?: string;
  website?: string;
  emailCode?: string;
  phoneCode?: string;
  [key: string]: string | undefined;
}
