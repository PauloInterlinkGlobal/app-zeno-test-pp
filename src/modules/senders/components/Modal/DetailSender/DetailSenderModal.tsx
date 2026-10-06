'use client';

import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import {
  senderStatusLabel,
  senderStatusStyles,
} from '@/modules/senders/constants/senders';
import { ISender, SenderStatus } from '@/modules/senders/interfaces/senders';
import {
  AlertCircle,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  X,
} from 'lucide-react';

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
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

const statusDotStyles: Record<SenderStatus, string> = {
  validated: 'bg-emerald-500',
  pending: 'bg-amber-500',
  rejected: 'bg-rose-500',
};

const statusIcons: Record<SenderStatus, typeof CheckCircle2> = {
  validated: CheckCircle2,
  pending: Clock,
  rejected: AlertCircle,
};

interface DetailSenderModalProps {
  sender?: ISender | null;
  onClose?: () => void;
}

export function DetailSenderModal({ sender, onClose }: DetailSenderModalProps) {
  const { closeModal } = useModalStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  if (!sender) return null;

  const StatusIcon = statusIcons[sender.status] || CheckCircle2;
  const initials = sender.sender.trim().slice(0, 2).toUpperCase() || 'ID';

  return (
    <Modal id="DETAIL_SENDER" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-divider px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-primary">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-primary-content">
                Detalhes do Remetente
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 p-6">
          {/* Main Sender ID Card */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border-ui bg-surface-raised p-4 transition-colors">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-white shadow-sm">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-content">
                  ID do Remitente
                </span>
                <h3 className="truncate text-lg font-bold tracking-tight text-primary-content">
                  {sender.sender}
                </h3>
              </div>
            </div>

            <div
              className={`inline-flex shrink-0 items-center gap-1.5  px-3 py-1 text-xs font-semibold ${senderStatusStyles[sender.status]}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              <span>{senderStatusLabel[sender.status]}</span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border-ui bg-surface p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center  text-neutral-600 dark:text-neutral-300">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-muted-content">
                  Data de Criação
                </p>
                <p className="truncate text-xs font-semibold text-primary-content sm:text-sm">
                  {formatDate(sender.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border-ui bg-surface p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-muted-content">
                  Data de Validação
                </p>
                <p className="truncate text-xs font-semibold text-primary-content sm:text-sm">
                  {formatDate(sender.validatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 rounded-xl border border-border-ui bg-surface p-4">
            <div className="flex items-center gap-2 text-muted-content">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Descrição
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-content">
              {sender.description || (
                <span className="italic text-muted-content">
                  Nenhuma descrição fornecida para este remetente.
                </span>
              )}
            </p>
          </div>
          {/* Footer Action */}
          <div className="flex justify-end border-t border-divider pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-border-ui bg-surface px-5 py-2.5 text-sm font-semibold text-primary-content transition-colors hover:bg-item-hover"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
