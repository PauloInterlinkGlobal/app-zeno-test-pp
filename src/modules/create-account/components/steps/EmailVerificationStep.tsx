'use client';

import { useState } from 'react';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import {
  ArrowLeft,
  ArrowRight,
  KeyRound,
  MailCheck,
  RefreshCw,
} from 'lucide-react';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';
import { useToastStore } from '@/core/store';

export function EmailVerificationStep() {
  const [isResending, setIsResending] = useState(false);
  const { formData, errors, isLoading, setField, nextStep, prevStep } =
    useCreateAccountStore();
  const { success } = useToastStore();

  const handleResendCode = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      success('Novo código de verificação enviado para o seu e-mail!');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-3">
          <MailCheck className="w-3.5 h-3.5" />
          Tarefa 3 de 4: Confirmação de E-mail
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Verifique o seu endereço de e-mail
        </h1>
        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          Enviámos um código de verificação de 6 dígitos para o endereço{' '}
          <strong className="text-text-primary font-semibold">
            {formData.corporateEmail || 'seu e-mail empresarial'}
          </strong>
          .
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-border-ui bg-surface-raised/50 space-y-4">
        <div>
          <Input
            label="Código de Confirmação (6 dígitos)"
            placeholder="Ex.: 123456"
            type="text"
            leftIcon={KeyRound}
            inputMode="numeric"
            maxLength={6}
            value={formData.emailCode}
            onChange={(e) => setField('emailCode', e.target.value)}
            error={errors.emailCode}
            disabled={isLoading}
            className="text-center font-mono tracking-widest text-lg py-3"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-text-muted">Não recebeu o código?</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResendCode}
            isLoading={isResending}
            leftIcon={RefreshCw}
          >
            Reenviar código
          </Button>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={prevStep}
          disabled={isLoading}
          leftIcon={ArrowLeft}
        >
          Voltar aos Contactos
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => nextStep()}
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Confirmar e Avançar
        </Button>
      </div>
    </div>
  );
}

export default EmailVerificationStep;
