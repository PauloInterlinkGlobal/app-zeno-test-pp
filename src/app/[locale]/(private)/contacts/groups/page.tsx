import { GroupsList } from '@/modules/groups/components/GroupsList';
import { groupsMock } from '@/modules/groups/mocks/groups.mock';
import { parseGroupsFilters } from '@/modules/groups/utils/groups-filters';

interface GroupsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GroupsPage({ searchParams }: GroupsPageProps) {
  const filters = parseGroupsFilters(await searchParams);
  const data = groupsMock;

  return <GroupsList data={data} filters={filters} />;
}
