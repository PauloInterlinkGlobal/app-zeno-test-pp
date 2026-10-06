'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import { useCreateAccountStore } from '../store/useCreateAccountStore';
import { CreateCompanyProgress } from './CreateCompanyProgress';
import { CompanyDataStep } from './steps/CompanyDataStep';
import { CompanyContactsStep } from './steps/CompanyContactsStep';
import { EmailVerificationStep } from './steps/EmailVerificationStep';
import { PhoneVerificationStep } from './steps/PhoneVerificationStep';

export function CreateCompanyWizard() {
  const currentStep = useCreateAccountStore((state) => state.currentStep);
  const direction = useCreateAccountStore((state) => state.direction);

  return (
    <div className="w-full">
      <CreateCompanyProgress />

      <div className="bg-surface rounded-2xl border border-border-ui shadow-sm p-6 sm:p-10 transition-all">
        <AnimatedStep stepKey={String(currentStep)} direction={direction}>
          {currentStep === 1 && <CompanyDataStep />}
          {currentStep === 2 && <CompanyContactsStep />}
          {currentStep === 3 && <EmailVerificationStep />}
          {currentStep === 4 && <PhoneVerificationStep />}
        </AnimatedStep>
      </div>
    </div>
  );
}

export default CreateCompanyWizard;
