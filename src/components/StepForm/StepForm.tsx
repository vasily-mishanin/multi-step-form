import { useState } from 'react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { Step } from '../../model/types';
import Form from '../Form/Form';
import { FormPersonal } from '../FormPersonal/FormPersonal';
import { StepsSection } from '../StepsSection/StepsSection';
import { StepBadge } from '../UI/StepBadge/StepBadge';
import './StepForm.scss';

const FORMS = [
  FormPersonal(),
  <div>Two</div>,
  <div>Three</div>,
  <div>Four</div>,
];

const STEPS: Step[] = [
  { name: 'STEP 1', title: 'YOUR INFO' },
  { name: 'STEP 2', title: 'SELECT PLAN' },
  { name: 'STEP 3', title: 'ADD-ONS' },
  { name: 'STEP 4', title: 'SUMMARY' },
];

export default function StepForm() {
  const { steps, currentStep, next, back } = useMultiStepForm(FORMS);
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    next();
    setActiveStep((step) => {
      if (step >= STEPS.length) {
        return step;
      }
      return step + 1;
    });
  };

  const handleBack = () => {
    back();
    setActiveStep((step) => {
      if (step <= 1) {
        return step;
      }
      return step - 1;
    });
  };

  return (
    <section className='step-form'>
      <StepsSection steps={STEPS} activeStepNumber={activeStep} />
      <Form
        onNext={handleNext}
        onBack={handleBack}
        currentForm={currentStep}
        currentStep={activeStep}
      />
    </section>
  );
}
