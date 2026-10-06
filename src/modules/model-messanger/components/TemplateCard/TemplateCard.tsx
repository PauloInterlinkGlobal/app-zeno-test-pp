'use client';

import { Calendar, Eye } from 'lucide-react';
import React from 'react';
import { CATEGORY_BADGE_STYLES } from '../../constants/templates';
import { useTemplatePreviewStore } from '../../store/useTemplatePreviewStore';
import { TemplateCardHighlight } from './components/TemplateCardHighlight';
import { TemplateCardMenu } from './components/TemplateCardMenu';
import { TemplateCardProps } from './types';

export function TemplateCard({
  template,
  onEdit,
  onDelete,
}: TemplateCardProps) {
  const selectedTemplate = useTemplatePreviewStore(
    (state) => state.selectedTemplate
  );
  const setSelectedTemplate = useTemplatePreviewStore(
    (state) => state.setSelectedTemplate
  );

  const isSelected = selectedTemplate?.id === template.id;

  const badge = CATEGORY_BADGE_STYLES[template.category] ?? {
    label: template.category.toUpperCase(),
    className:
      'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-200',
  };

  const formattedDate = new Date(template.createdAt).toLocaleDateString(
    'pt-PT'
  );

  return (
    <div
      onClick={() => setSelectedTemplate(template)}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-surface p-6 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-primary ring-2 ring-primary/30 shadow-md'
          : 'border-border-ui shadow-sm hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${badge.className}`}
            >
              {badge.label}
            </span>
            {isSelected && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary"></span>
            )}
          </div>

          <TemplateCardMenu
            template={template}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>

        <h3 className="mb-4 text-base font-bold text-text-primary group-hover:text-primary transition-colors">
          {template.title}
        </h3>

        <TemplateCardHighlight content={template.content} />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border-ui/40 pt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar size={14} className="text-text-muted" />
          <span>{formattedDate}</span>
        </div>

        <span className="rounded-md bg-surface-raised border border-border-ui/60 px-2 py-0.5 font-mono text-[11px] font-medium text-text-muted">
          Variables: {template.variablesCount}
        </span>
      </div>
    </div>
  );
}

export default TemplateCard;
