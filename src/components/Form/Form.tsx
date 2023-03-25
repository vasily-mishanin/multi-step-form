import { ReactElement } from 'react';
import FormControls from '../FormControls/FormControls';
import './Form.scss';

type FormWrapperProps = {
  currentForm: ReactElement;
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
};

export default function Form({
  onNext,
  onBack,
  currentForm,
  currentStep,
}: FormWrapperProps) {
  return (
    <form className='main-form flex flex-col justify-between items-center'>
      {currentForm}
      <FormControls onNext={onNext} onBack={onBack} currentStep={currentStep} />
    </form>
  );
}
