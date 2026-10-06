'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import {
  senderStatusLabel,
  senderStatusStyles,
} from '@/modules/senders/constants/senders';
import { ISender } from '@/modules/senders/interfaces/senders';
import { Eye, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeleteSenderModal, DetailSenderModal } from './Modal';

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso?: string | null) => {
  if (!iso) return '—';
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return '—';
  }
};

const columns = (
  onView?: (item: ISender) => void,
  onDelete?: (item: ISender) => void
): Column<ISender>[] => [
  {
    key: 'sender',
    header: 'Remetente',
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-semibold text-primary-content">
          {item.sender}
        </span>
        {item.description && (
          <span className="text-xs text-muted-content line-clamp-1">
            {item.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'createdAt',
    header: 'Data de criação',
    className: 'text-muted-content',
    render: (item) => formatDate(item.createdAt),
  },
  {
    key: 'validatedAt',
    header: 'Data de validação',
    className: 'text-muted-content',
    render: (item) => formatDate(item.validatedAt),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (item) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${senderStatusStyles[item.status]}`}
      >
        {senderStatusLabel[item.status]}
      </span>
    ),
  },
  {
    key: 'actions',
    header: 'Ação',
    actions: (item) => [
      {
        label: 'Ver detalhes',
        icon: Eye,
        onClick: () => onView?.(item),
      },
      {
        label: 'Eliminar',
        icon: Trash2,
        danger: true,
        onClick: () => onDelete?.(item),
      },
    ],
  },
];

interface SendersTableProps {
  data: ISender[];
  currentPage: number;
  totalPages: number;
  loading?: boolean;
}

export function SendersTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: SendersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openModal } = useModalStore();
  const [selectedSender, setSelectedSender] = useState<ISender | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleView = (sender: ISender) => {
    setSelectedSender(sender);
    openModal('DETAIL_SENDER');
  };

  const handleDelete = (sender: ISender) => {
    setSelectedSender(sender);
    openModal('DELETE_SENDER');
  };

  return (
    <>
      <Table<ISender>
        columns={columns(handleView, handleDelete)}
        data={data}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyMessage="Não foram encontrados remetentes (senders)."
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />

      <DetailSenderModal
        sender={selectedSender}
        onClose={() => setSelectedSender(null)}
      />
      <DeleteSenderModal
        sender={selectedSender}
        onClose={() => setSelectedSender(null)}
      />
    </>
  );
}
