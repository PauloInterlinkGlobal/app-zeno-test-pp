import type { ProjectInfo } from '../interfaces';

export const PROJECT_MOCK: ProjectInfo = {
  projectId: 'proj_sms_001',
  name: 'SMS Illílico',
  type: 'Marketing',
  description: 'Plataforma de gestão de campanhas de SMS e automações.',
  status: 'active',

  company: {
    tradeName: 'SMS Illílico',
    nif: '123456789',
    sector: 'Telecomunicações',

    contacts: {
      phone: '+351 912 345 678',
      isPhoneVerified: true,
      email: 'contato@smsillico.com',
      isEmailVerified: true,
    },

    address: {
      streetAddress: 'Rua da Tecnologia, 245',
      neighborhood: 'Centro',
      city: 'Lisboa',
      country: 'Portugal',
    },

    website: 'https://www.smsillico.com',
  },

  owner: '64d8f3d77d9a4e2e5b8c1234',
  webhookUrl: 'https://api.exemplo.com/webhooks/project-sms',
  customFields: ['campanha', 'vendas', 'whatsapp'],

  createdAt: new Date(),
};
