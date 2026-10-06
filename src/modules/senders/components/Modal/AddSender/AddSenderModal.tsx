'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddSenderModalProps {
  onClose?: () => void;
}

export function AddSenderModal({ onClose }: AddSenderModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [senderName, setSenderName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setSenderName('');
    setDescription('');
    setError('');
    closeModal();
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = senderName.trim().toUpperCase();
    if (!trimmed) {
      setError('O nome do remetente é obrigatório.');
      return;
    }

    if (trimmed.length > 11) {
      setError('O remetente não pode ter mais de 11 caracteres (padrão GSM).');
      return;
    }

    success('Pedido de registo de remetente submetido para validação!');
    handleClose();
  };

  return (
    <Modal id="ADD_SENDER" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-divider px-6 py-5">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold text-primary-content">
                Registar Remetente
              </h2>
              <p className="text-xs text-muted-content mt-3">
                Submeta o nome do remetente para validação pelas operadoras.
              </p>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <Input
              label="Nome do Remetente"
              placeholder="Ex: MINHAEMPRESA"
              maxLength={11}
              value={senderName}
              onChange={(e) => {
                setSenderName(e.target.value.toUpperCase());
                if (error) setError('');
              }}
              error={error}
              helperText={`${senderName.length}/11 caracteres`}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-content">
              Descrição do Uso
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva brevemente para que tipo de mensagens este remetente será utilizado."
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 border-t border-divider pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Submeter Remetente
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
