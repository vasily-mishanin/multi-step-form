import { useState } from 'react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { IFormData, IUser, PlanTitle, PlanType, Step } from '../../model/types';
import Form from '../Form/Form';
import { FormPersonal } from '../FormPersonal/FormPersonal';
import { FormPlan } from '../FormPlan/FormPlan';
import { StepsSection } from '../StepsSection/StepsSection';
import { StepBadge } from '../UI/StepBadge/StepBadge';
import './StepForm.scss';

const INITIAL_FORM_DATA: IFormData = {
  user: { name: '', email: '', phone: '' },
  plan: {
    planTitle: null,
    planType: 'month',
    price: 0,
    currency: '$',
    marketingMessage: '2 months free',
  },
  addOns: {
    onlineService: { checked: false, price: 1 },
    largerStorage: { checked: false, price: 2 },
    customizableProfile: { checked: false, price: 2 },
  },
};

const STEPS: Step[] = [
  { name: 'STEP 1', title: 'YOUR INFO' },
  { name: 'STEP 2', title: 'SELECT PLAN' },
  { name: 'STEP 3', title: 'ADD-ONS' },
  { name: 'STEP 4', title: 'SUMMARY' },
];

export default function StepForm() {
  const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);

  const updateUserFields = (user: Partial<IUser>) => {
    console.log('updateUserFields');
    setFormData((prev) => {
      return { ...prev, user: { ...prev.user, ...user } };
    });
  };

  const updatePlanFields = (planTitle: PlanTitle | null, period: PlanType) => {
    console.log('updatePlanFields');
    let newPrice: number = 0;
    if (planTitle === 'Arcade') {
      newPrice = 9;
    } else if (planTitle === 'Advanced') {
      newPrice = 12;
    } else if (planTitle === 'Pro') {
      newPrice = 15;
    }
    if (period === 'year') {
      newPrice = newPrice * 10;
    }
    setFormData((prev) => {
      return {
        ...prev,
        plan: {
          ...prev.plan,
          planTitle: planTitle ? planTitle : prev.plan.planTitle,
          planType: period,
          price: newPrice,
        },
      };
    });
  };

  const { steps, currentStep, next, back } = useMultiStepForm([
    <FormPersonal {...formData.user} updateFields={updateUserFields} />,
    <FormPlan {...formData.plan} updatePlan={updatePlanFields} />,
    <div>Three</div>,
    <div>Four</div>,
  ]);
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
