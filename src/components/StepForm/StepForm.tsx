import { useEffect, useState } from 'react';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import {
  IAddOn,
  IFormData,
  IUser,
  PlanTitle,
  PlanType,
  Step,
} from '../../model/types';
import Form from '../Form/Form';
import { FormAddOns } from '../FormAddOns/FormAddOns';
import { FormFinish } from '../FormFinish/FormFinish';
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
  addOns: [],
};

const STEPS: Step[] = [
  { name: 'STEP 1', title: 'YOUR INFO' },
  { name: 'STEP 2', title: 'SELECT PLAN' },
  { name: 'STEP 3', title: 'ADD-ONS' },
  { name: 'STEP 4', title: 'SUMMARY' },
];

export default function StepForm() {
  const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);
  const [nextIsDisabled, setNextIsDisabled] = useState(true);

  const handleUserValid = (val: boolean) => {
    setNextIsDisabled(!val);
  };

  const handlePlanValid = (val: boolean) => {
    setNextIsDisabled(!val);
  };

  const handleAddOnsValid = (val: boolean) => {
    // add ons are optional so no need to disable Next btn
  };

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
      let prevPeriod = prev.plan.planType;
      let newAddOns = [...prev.addOns];
      // update addOns if period changed
      if (prevPeriod !== period) {
        newAddOns = newAddOns.map((addOn) => {
          if (period === 'month') {
            return { ...addOn, price: addOn.price / 10 };
          }
          if (period === 'year') {
            return { ...addOn, price: addOn.price * 10 };
          } else {
            return addOn;
          }
        });
      }
      return {
        ...prev,
        plan: {
          ...prev.plan,
          planTitle: planTitle ? planTitle : prev.plan.planTitle,
          planType: period,
          price: newPrice,
        },
        addOns: newAddOns,
      };
    });
  };

  const updateAddOnsFields = (addOn: IAddOn) => {
    console.log('updateAddOnsFields ', addOn);
    setFormData((prev) => {
      const newAddOns = [...prev.addOns];
      const oldAddOnIndex = newAddOns.findIndex(
        (item) => item.title === addOn.title
      );
      console.log('oldAddOnIndex - ', oldAddOnIndex);

      if (oldAddOnIndex === -1) {
        newAddOns.push(addOn);
      } else {
        newAddOns.splice(oldAddOnIndex, 1);
      }

      return {
        ...prev,
        addOns: newAddOns,
      };
    });
  };

  // CUSTOM HOOK
  const { steps, currentStep, next, back } = useMultiStepForm([
    <FormPersonal
      {...formData.user}
      updateFields={updateUserFields}
      iAmValid={handleUserValid}
    />,
    <FormPlan
      {...formData.plan}
      updatePlan={updatePlanFields}
      iAmValid={handlePlanValid}
    />,
    <FormAddOns
      checkedAddOns={formData.addOns}
      planType={formData.plan.planType}
      updateAddOn={updateAddOnsFields}
      iAmValid={handleAddOnsValid}
    />,
    <FormFinish
      plan={formData.plan}
      addOns={formData.addOns}
      goToPlans={goToPlans}
    />,
  ]);

  const [activeStep, setActiveStep] = useState(1); // only for sidebar numbers

  const handleNext = () => {
    next();
    setActiveStep((prevStep) => {
      if (prevStep >= STEPS.length) {
        return prevStep;
      }
      return prevStep + 1;
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

  function goToPlans() {
    handleBack();
    handleBack();
  }

  return (
    <section className='step-form'>
      <StepsSection steps={STEPS} activeStepNumber={activeStep} />
      <Form
        onNext={handleNext}
        onBack={handleBack}
        currentForm={currentStep}
        currentStep={activeStep}
        nextIsDisabled={nextIsDisabled}
      />
    </section>
  );
}
