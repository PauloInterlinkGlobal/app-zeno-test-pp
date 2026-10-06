'use client';

import { ChevronDown, LucideIcon } from 'lucide-react';
import React, { forwardRef } from 'react';
import { SelectOption, SelectSize, SelectVariant } from '../types';

interface SelectTriggerProps {
  id?: string;
  isOpen: boolean;
  disabled?: boolean;
  error?: string;
  variant?: SelectVariant;
  sizeStyles: { trigger: string; icon: string };
  selectedOption?: SelectOption;
  placeholder?: string;
  leftIcon?: LucideIcon;
  wrapperClassName?: string;
  className?: string;
  onClick: () => void;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      id,
      isOpen,
      disabled = false,
      error,
      variant = 'outline',
      sizeStyles,
      selectedOption,
      placeholder = 'Selecione uma opção',
      leftIcon: LeftIcon,
      wrapperClassName = '',
      className = '',
      onClick,
    },
    ref
  ) => {
    const borderClass =
      variant === 'ghost'
        ? 'border-transparent bg-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60'
        : error
          ? 'border-red-500 ring-1 ring-red-500'
          : isOpen
            ? 'border-primary-500 ring-1 ring-primary-500 dark:border-primary-400 dark:ring-primary-400'
            : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600';

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onClick}
        className={`relative flex w-full items-center justify-between rounded-lg border bg-white transition-all text-left outline-none dark:bg-neutral-900/50 ${borderClass} ${
          sizeStyles.trigger
        } ${disabled ? 'cursor-not-allowed opacity-60 bg-neutral-100 dark:bg-neutral-800' : 'cursor-pointer'} ${
          LeftIcon ? 'pl-2.5' : 'pl-3.5'
        } pr-3.5 ${wrapperClassName} ${className}`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {LeftIcon && (
            <LeftIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0" />
          )}
          <span
            className={`truncate ${
              selectedOption
                ? 'text-neutral-900 dark:text-neutral-100 font-normal'
                : 'text-neutral-400 dark:text-neutral-300'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`ml-2 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 shrink-0 ${
            sizeStyles.icon
          } ${isOpen ? 'rotate-180 text-primary-500 dark:text-primary-400' : ''}`}
        />
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';
