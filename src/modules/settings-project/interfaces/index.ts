export type ProjectStatus =
  'active' | 'suspended' | 'pending_deletion' | 'deleted';

export interface ProjectInfo {
  projectId: string;
  name: string;
  type: string;
  description: string;
  status: ProjectStatus;

  company: {
    tradeName: string;
    nif: string;
    sector: string;

    contacts?: {
      phone?: string;
      isPhoneVerified?: boolean;
      email?: string;
      isEmailVerified?: boolean;
    };

    address?: {
      streetAddress: string;
      neighborhood: string;
      city: string;
      country: string;
    };

    website?: string;
  };

  owner?: string;
  webhookUrl?: string;
  customFields: string[];

  createdAt: Date;
  deletionScheduledAt?: Date;
  deletionRequestedAt?: Date;
  deletionRequestedBy?: string;
  deletionReason?: string;
}

export interface CompanyInfo {
  name: string;
  taxId: string;
  local: string;
  sector: string;
  email: string;
  phone: string;
  site: string;
  country: string;
}
