import { TemplatesList } from '@/modules/model-messanger/components/TemplatesList';
import { templatesMock } from '@/modules/model-messanger/mocks/templates.mock';
import { parseTemplatesFilters } from '@/modules/model-messanger/utils/templates-filters';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modelos de Mensagens | SMSillico',
  description: 'Faça a gestão dos seus modelos de SMS e notificações.',
};

interface ModelManagementPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ModelManagementPage({
  searchParams,
}: ModelManagementPageProps) {
  const filters = parseTemplatesFilters(await searchParams);
  const data = templatesMock;

  return <TemplatesList data={data} filters={filters} />;
}
