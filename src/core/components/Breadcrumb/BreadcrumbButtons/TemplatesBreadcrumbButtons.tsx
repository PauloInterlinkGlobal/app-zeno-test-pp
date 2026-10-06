'use client';

import { useModalStore } from '@/core/store/useModalStore';
import { Plus } from 'lucide-react';

interface TemplatesBreadcrumbButtonsProps {
  onAdd?: () => void;
}

export function TemplatesBreadcrumbButtons({
  onAdd,
}: TemplatesBreadcrumbButtonsProps) {
  const { openModal } = useModalStore();

  const handleAdd = onAdd ?? (() => openModal('ADD_TEMPLATE'));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md shadow-primary/20"
      >
        <Plus size={16} aria-hidden />
        Novo Modelo
      </button>
    </div>
  );
}
