'use client';

import React from 'react';

interface TemplateCardHighlightProps {
  content: string;
}

export function TemplateCardHighlight({ content }: TemplateCardHighlightProps) {
  const parts = content.split(/(\{\{[^}]+\}\})/g);

  return (
    <div className="rounded-xl border border-border-ui/50 bg-[#f4f7fc] dark:bg-neutral-900/70 p-4 font-mono text-xs leading-relaxed text-text-secondary min-h-[96px]">
      {parts.map((part, index) => {
        if (part.startsWith('{{') && part.endsWith('}}')) {
          return (
            <span
              key={index}
              className="font-semibold text-purple-600 dark:text-purple-400"
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}
