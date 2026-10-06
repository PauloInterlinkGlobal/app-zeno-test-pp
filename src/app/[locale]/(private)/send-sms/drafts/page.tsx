import { DraftList } from '@/modules/draft-sms/components/DraftList';
import { draftSmsMock } from '@/modules/draft-sms/mocks/draft-sms.mock';
import { parseDraftFilters } from '@/modules/draft-sms/utils/draft-filters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rascunhos',
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DraftSmsPage({ searchParams }: PageProps) {
  const filters = parseDraftFilters(await searchParams);

  return <DraftList data={draftSmsMock} filters={filters} />;
}
