import { SendersList } from '@/modules/senders/components/SendersList';
import { sendersMock } from '@/modules/senders/mocks/senders.mock';
import { parseSendersFilters } from '@/modules/senders/utils/senders-filters';

interface SendersPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SendersPage({ searchParams }: SendersPageProps) {
  const filters = parseSendersFilters(await searchParams);
  const data = sendersMock;

  return <SendersList data={data} filters={filters} />;
}
