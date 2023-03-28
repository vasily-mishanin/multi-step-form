import { FormEvent, ReactElement, useState } from 'react';
import FormControls from '../FormControls/FormControls';
import './Form.scss';

type FormWrapperProps = {
  currentForm: ReactElement;
  currentStep: number;
  nextIsDisabled: boolean;
  onNext: () => void;
  onBack: () => void;
  handleConfirm: () => void;
};

export default function Form({
  onNext,
  onBack,
  handleConfirm,
  currentForm,
  currentStep,
  nextIsDisabled,
}: FormWrapperProps) {
  return (
    <form className='main-form flex flex-col justify-between items-center'>
      {currentForm}

      {currentStep < 5 && (
        <FormControls
          onNext={onNext}
          onBack={onBack}
          onConfirm={handleConfirm}
          currentStep={currentStep}
          nextIsDisabled={nextIsDisabled}
        />
      )}
    </form>
  );
}
