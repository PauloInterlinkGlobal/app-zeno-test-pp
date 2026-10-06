'use client';

import { Input } from '@/core/components/Input';
import { UserRound } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { ProjectInfo, ProjectStatus } from '../interfaces';

type Errors = Partial<Record<string, string>>;

const STATUS_OPTIONS: Array<{ value: ProjectStatus; label: string }> = [
  { value: 'active', label: 'Ativo' },
  { value: 'suspended', label: 'Suspenso' },
  { value: 'pending_deletion', label: 'Pendente de eliminação' },
  { value: 'deleted', label: 'Eliminado' },
];

const updateNestedValue = <T extends Record<string, any>>(
  obj: T,
  path: string,
  value: string
): T => {
  const parts = path.split('.');
  const [firstKey, ...rest] = parts;

  if (!firstKey) return obj;

  if (rest.length === 0) {
    return { ...obj, [firstKey]: value } as T;
  }

  return {
    ...obj,
    [firstKey]: updateNestedValue(obj[firstKey] ?? {}, rest.join('.'), value),
  } as T;
};

function validate(v: ProjectInfo): Errors {
  const errors: Errors = {};

  if (!v.name.trim()) errors.name = 'Obrigatório';
  if (!v.type.trim()) errors.type = 'Obrigatório';
  if (!v.description.trim()) errors.description = 'Obrigatório';
  if (!v.status) errors.status = 'Obrigatório';
  if (!v.company.tradeName.trim()) errors['company.tradeName'] = 'Obrigatório';
  if (!v.company.nif.trim()) errors['company.nif'] = 'Obrigatório';
  if (!v.company.sector.trim()) errors['company.sector'] = 'Obrigatório';
  if (!v.company.contacts?.email?.trim())
    errors['company.contacts.email'] = 'Obrigatório';

  return errors;
}

export function ProjectForm({ defaultValues }: { defaultValues: ProjectInfo }) {
  const [initial, setInitial] = useState(defaultValues);
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<Errors>({});

  const isDirty = JSON.stringify(values) !== JSON.stringify(initial);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => updateNestedValue(prev, name, value));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCustomFieldsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((prev) => ({
      ...prev,
      customFields: value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const handleCancel = () => {
    setValues(initial);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    console.log(values);
    setInitial(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center text-primary">
          <UserRound size={24} aria-hidden />
        </span>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Informação do projeto
          </h2>
          <p className="mt-1 text-sm text-muted-content">
            Atualize os dados do projeto e da empresa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Nome do Projeto *"
          placeholder="Digite o nome do projeto"
          value={values.name ?? ''}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          id="type"
          name="type"
          label="Tipo de Projeto *"
          placeholder="Digite o tipo de projeto"
          value={values.type ?? ''}
          onChange={handleChange}
          error={errors.type}
        />

        <div className="md:col-span-2">
          <Input
            id="description"
            name="description"
            label="Descrição do Projeto *"
            placeholder="Digite a descrição do projeto"
            value={values.description ?? ''}
            onChange={handleChange}
            error={errors.description}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="status"
            className="text-sm font-medium text-primary-content"
          >
            Status do Projeto *
          </label>
          <select
            id="status"
            name="status"
            value={values.status ?? ''}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-primary-content outline-none transition focus:border-primary"
          >
            <option value="">Selecione o status</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status ? (
            <p className="text-xs text-red-500">{errors.status}</p>
          ) : null}
        </div>

        <Input
          id="company.tradeName"
          name="company.tradeName"
          label="Nome fantasia *"
          placeholder="Digite o nome fantasia"
          value={values.company.tradeName ?? ''}
          onChange={handleChange}
          error={errors['company.tradeName']}
        />

        <Input
          id="company.nif"
          name="company.nif"
          label="NIF *"
          placeholder="Digite o NIF"
          value={values.company.nif ?? ''}
          onChange={handleChange}
          error={errors['company.nif']}
        />

        <Input
          id="company.sector"
          name="company.sector"
          label="Setor *"
          placeholder="Digite o setor"
          value={values.company.sector ?? ''}
          onChange={handleChange}
          error={errors['company.sector']}
        />

        <Input
          id="company.contacts.phone"
          name="company.contacts.phone"
          label="Telefone"
          placeholder="Digite o telefone"
          value={values.company.contacts?.phone ?? ''}
          onChange={handleChange}
        />

        <Input
          id="company.contacts.email"
          name="company.contacts.email"
          label="Email da empresa *"
          placeholder="Digite o email"
          value={values.company.contacts?.email ?? ''}
          onChange={handleChange}
          error={errors['company.contacts.email']}
        />

        <Input
          id="company.website"
          name="company.website"
          label="Website"
          placeholder="https://"
          value={values.company.website ?? ''}
          onChange={handleChange}
        />

        <Input
          id="company.address.streetAddress"
          name="company.address.streetAddress"
          label="Endereço"
          placeholder="Rua, número, complemento"
          value={values.company.address?.streetAddress ?? ''}
          onChange={handleChange}
        />

        <Input
          id="company.address.neighborhood"
          name="company.address.neighborhood"
          label="Bairro"
          placeholder="Digite o bairro"
          value={values.company.address?.neighborhood ?? ''}
          onChange={handleChange}
        />

        <Input
          id="company.address.city"
          name="company.address.city"
          label="Cidade"
          placeholder="Digite a cidade"
          value={values.company.address?.city ?? ''}
          onChange={handleChange}
        />

        <Input
          id="company.address.country"
          name="company.address.country"
          label="País"
          placeholder="Digite o país"
          value={values.company.address?.country ?? ''}
          onChange={handleChange}
        />

        <Input
          id="webhookUrl"
          name="webhookUrl"
          label="Webhook URL"
          placeholder="https://api.exemplo.com/webhook"
          value={values.webhookUrl ?? ''}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <Input
            id="customFields"
            name="customFields"
            label="Custom fields"
            placeholder="campo1, campo2, campo3"
            value={values.customFields.join(', ')}
            onChange={handleCustomFieldsChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-black/5 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={!isDirty}
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Guardar alterações
        </button>
      </div>
    </form>
  );
}
