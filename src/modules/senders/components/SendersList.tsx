import { ISender } from '@/modules/senders/interfaces/senders';
import {
  filterSenders,
  paginate,
  type SendersFiltersValue,
} from '@/modules/senders/utils/senders-filters';
import { SendersFilters } from './SendersFilters';
import { SendersTable } from './SendersTable';
import { SendersWrapper } from './SendersWrapper';

interface SendersListProps {
  data: ISender[];
  filters: SendersFiltersValue;
}

export function SendersList({ data, filters }: SendersListProps) {
  const filtered = filterSenders(data, filters);
  const { items, currentPage, totalPages } = paginate(filtered, filters.page);

  return (
    <SendersWrapper>
      <div className="flex flex-col gap-4">
        <SendersFilters />

        <SendersTable
          data={items}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </SendersWrapper>
  );
}
