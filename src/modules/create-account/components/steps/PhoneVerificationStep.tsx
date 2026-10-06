'use client';

import { useState } from 'react';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { useRouter } from '@/core/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  KeyRound,
  MessageSquareCode,
  RefreshCw,
} from 'lucide-react';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';
import { useToastStore } from '@/core/store';

export function PhoneVerificationStep() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const { formData, errors, isLoading, setField, nextStep, prevStep } =
    useCreateAccountStore();
  const { success } = useToastStore();

  const handleResendSms = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      success('Novo código SMS de segurança enviado para o seu telemóvel!');
    }, 600);
  };

  const handleComplete = () => {
    nextStep(() => {
      success('Verificação concluída com sucesso!');
      router.push('/pending-activation');
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-3">
          <MessageSquareCode className="w-3.5 h-3.5" />
          Tarefa 4 de 4: Confirmação de Telefone
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Verifique o seu número de telefone
        </h1>
        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          Enviámos uma mensagem SMS com um código de validação para{' '}
          <strong className="text-text-primary font-semibold">
            {formData.phone || 'seu contacto telefónico'}
          </strong>
          .
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-border-ui bg-surface-raised/50 space-y-4">
        <div>
          <Input
            label="Código de Confirmação SMS (6 dígitos)"
            placeholder="Ex.: 654321"
            type="text"
            leftIcon={KeyRound}
            inputMode="numeric"
            maxLength={6}
            value={formData.phoneCode}
            onChange={(e) => setField('phoneCode', e.target.value)}
            error={errors.phoneCode}
            disabled={isLoading}
            className="text-center font-mono tracking-widest text-lg py-3"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-text-muted">Não recebeu o SMS?</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResendSms}
            isLoading={isResending}
            leftIcon={RefreshCw}
          >
            Reenviar SMS
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
          Voltar ao E-mail
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleComplete}
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Concluir Registo
        </Button>
      </div>
    </div>
  );
}

export default PhoneVerificationStep;
