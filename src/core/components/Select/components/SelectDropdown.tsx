'use client';

import { Check } from 'lucide-react';
import React, { forwardRef } from 'react';
import { PopoverPlacement, SelectOption } from '../types';

interface SelectDropdownProps {
  placement: PopoverPlacement;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  selectedValue: string | number;
  optionSizeClass: string;
  onSelect: (option: SelectOption) => void;
}

export const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps>(
  (
    {
      placement,
      label,
      placeholder,
      options,
      selectedValue,
      optionSizeClass,
      onSelect,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="listbox"
        aria-label={label || placeholder}
        className={`absolute left-0 z-[100] w-full min-w-[200px] overflow-hidden rounded-xl border border-neutral-200/90 bg-white/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-md ring-1 ring-black/5 transition-all animate-in fade-in-0 zoom-in-95 duration-150 dark:border-neutral-800 dark:bg-[#161b26]/95 dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] dark:ring-white/10 ${
          placement === 'top'
            ? 'bottom-[calc(100%+6px)] origin-bottom'
            : 'top-[calc(100%+6px)] origin-top'
        }`}
      >
        <div className="max-h-60 overflow-y-auto space-y-0.5 overscroll-contain">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-center text-xs text-neutral-400 dark:text-neutral-500">
              Nenhuma opção disponível
            </div>
          ) : (
            options.map((opt) => {
              const isSelected = String(opt.value) === String(selectedValue);
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => onSelect(opt)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 ${optionSizeClass} text-left transition-colors ${
                    opt.disabled
                      ? 'opacity-40 cursor-not-allowed'
                      : isSelected
                        ? 'bg-primary-50 font-medium text-primary-600 dark:bg-primary-950/60 dark:text-primary-400'
                        : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/70 dark:hover:text-neutral-100'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';
