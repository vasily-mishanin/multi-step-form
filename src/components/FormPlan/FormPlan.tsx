import { useState } from 'react';
import { IPlan, PlanTitle, PlanType } from '../../model/types';
import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';
import { StepBadge } from '../UI/StepBadge/StepBadge';
import './FormPlan.scss';
import IconArcade from '../../assets/images/icon-arcade.svg';
import IconAdvanced from '../../assets/images/icon-advanced.svg';
import IconPro from '../../assets/images/icon-pro.svg';
import { SliderCheckbox } from '../UI/SliderCheckbox/SliderCheckbox';

type FormPlanProps = {
  planType: PlanType;
};

type InputPlanProps = {
  index: number;
  checkedIndex: number | null;
  plan: IPlan;
  required?: boolean;
  errorMsg?: string;
  onCheck: (index: number) => void;
};

type PlanBadgeProps = {
  title: PlanTitle;
};

const PLANS_DATA: IPlan[] = [
  {
    title: 'Arcade',
    planType: 'month',
    price: 9,
    currency: '$',
    marketingMessage: '2 months free',
  },
  {
    title: 'Advanced',
    planType: 'year',
    price: 12,
    currency: '$',
    marketingMessage: '2 months free',
  },
  {
    title: 'Pro',
    planType: 'month',
    price: 15,
    currency: '$',
    marketingMessage: '2 months free',
  },
];

export function FormPlan({ planType }: FormPlanProps) {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const handleCheck = (index: number) => {
    setCheckedIndex(index);
  };

  return (
    <SubfromWrapper
      title='Select your plan'
      subtitle='You have the option of monthly or yearly billing'
    >
      {PLANS_DATA.map((plan, index) => (
        <InputPlan
          index={index}
          checkedIndex={checkedIndex}
          plan={plan}
          onCheck={handleCheck}
        />
      ))}

      <SliderCheckbox leftLabel='Monthly' rightLabel='Yearly' />
    </SubfromWrapper>
  );
}

/// elements

function InputPlan({
  plan,
  required,
  errorMsg,
  onCheck,
  index,
  checkedIndex,
}: InputPlanProps) {
  const inputClass =
    index === checkedIndex
      ? 'subform-plan-input checked'
      : 'subform-plan-input';

  return (
    <div className={inputClass} onClick={() => onCheck(index)}>
      {' '}
      <PlanBadge title={plan.title} />
      <div className=''>
        <h3 className='font-[Ubuntu-Bold] text-[var(--color-prime-marine-blue)]'>
          {plan.title}
        </h3>
        <p className='font-[Ubuntu-Regular] text-[var(--color-neutral-cool-gray)] text-sm'>
          {plan.currency}{' '}
          {plan.planType === 'month'
            ? `${plan.price}/mo`
            : `${plan.price * 10}/yr`}
        </p>
        {plan.planType === 'year' && (
          <p className='font-[Ubuntu-Medium] text-[var(--color-prime-marine-blue)] text-sm'>
            {plan.marketingMessage}
          </p>
        )}
      </div>
    </div>
  );
}

function PlanBadge({ title }: PlanBadgeProps) {
  switch (title) {
    case 'Arcade':
      return <img src={IconArcade} alt={title}></img>;
      break;
    case 'Advanced':
      return <img src={IconAdvanced} alt={title}></img>;
      break;
    case 'Pro':
      return <img src={IconPro} alt={title}></img>;
      break;
    default:
      return <img src={IconArcade} alt={title}></img>;
      break;
  }
}
