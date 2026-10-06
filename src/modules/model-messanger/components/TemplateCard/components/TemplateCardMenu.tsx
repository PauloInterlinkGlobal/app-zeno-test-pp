'use client';

import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ITemplate } from '../../../interfaces/templates';

interface TemplateCardMenuProps {
  template: ITemplate;
  onEdit?: (template: ITemplate) => void;
  onDelete?: (template: ITemplate) => void;
}

export function TemplateCardMenu({
  template,
  onEdit,
  onDelete,
}: TemplateCardMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Opções do modelo"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-1 text-text-muted transition-colors hover:bg-item-hover hover:text-text-primary"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-border-ui bg-surface shadow-xl">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit?.(template);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-text-primary transition-colors hover:bg-item-hover"
          >
            <Pencil size={14} />
            Editar
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete?.(template);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 size={14} />
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
