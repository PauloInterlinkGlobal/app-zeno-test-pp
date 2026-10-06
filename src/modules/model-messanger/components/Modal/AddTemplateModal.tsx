'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { Select } from '@/core/components/Select';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { Plus, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { TEMPLATE_CATEGORIES } from '../../constants/templates';
import { extractVariables } from '../../utils/templates-filters';

interface AddTemplateModalProps {
  onClose?: () => void;
}

export function AddTemplateModal({ onClose }: AddTemplateModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('promocional');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const variables = extractVariables(content);

  const handleClose = () => {
    setTitle('');
    setContent('');
    setCategory('promocional');
    setError('');
    closeModal();
    onClose?.();
  };

  const insertVariable = (variableName: string) => {
    setContent((prev) => `${prev}{{${variableName}}}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('O título do modelo é obrigatório.');
      return;
    }

    if (!content.trim()) {
      setError('O conteúdo da mensagem é obrigatório.');
      return;
    }

    success('Modelo criado com sucesso!');
    handleClose();
  };

  const selectableCategories = TEMPLATE_CATEGORIES.filter(
    (c) => c.value !== ''
  );

  return (
    <Modal id="ADD_TEMPLATE" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-ui px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Novo Modelo de Mensagem
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Crie um modelo reutilizável com suporte a variáveis dinâmicas.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-item-hover hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <Input
            label="Título do Modelo"
            placeholder="Ex: Promoção Luanda"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            error={error}
            autoFocus
          />

          <Select
            label="Categoria"
            options={selectableCategories}
            value={category}
            onChange={(v) => setCategory(String(v))}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Conteúdo do Modelo
              </label>
              <span className="text-xs text-text-muted font-mono">
                {variables.length}{' '}
                {variables.length === 1 ? 'variável' : 'variáveis'}
              </span>
            </div>

            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ex: Sr(a) {{firstName}}, a sua encomenda {{codigo}} está a caminho..."
              className="w-full rounded-lg border border-border-ui bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-sans"
            />
          </div>

          {/* Quick Variable suggestions */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-text-muted flex items-center gap-1">
              <Tag size={12} />
              Inserir variáveis rápidas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'firstName',
                'lastName',
                'cidade',
                'ano',
                'codigo',
                'data',
                'valor',
              ].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => insertVariable(v)}
                  className="rounded-md bg-surface-raised border border-border-ui/60 px-2 py-0.5 font-mono text-xs text-primary hover:bg-primary-500/10 transition-colors"
                >
                  +{`{{${v}}}`}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-end gap-3 border-t border-border-ui pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border-ui bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-item-hover"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md shadow-primary/20"
            >
              <Plus size={16} />
              Criar Modelo
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
