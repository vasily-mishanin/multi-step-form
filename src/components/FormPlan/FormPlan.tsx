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
  planTitle: PlanTitle | null;
  updatePlan: (planTitle: PlanTitle | null, period: PlanType) => void;
};

type InputPlanProps = {
  index: number;
  checkedIndex: number | null;
  plan: IPlan;
  required?: boolean;
  errorMsg?: string;
  onCheck: (index: number, title: PlanTitle | null) => void;
  period: PlanType;
};

type PlanBadgeProps = {
  title: PlanTitle | null;
};

const PLANS_DATA: IPlan[] = [
  {
    planTitle: 'Arcade',
    planType: 'month',
    price: 9,
    currency: '$',
    marketingMessage: '2 months free',
  },
  {
    planTitle: 'Advanced',
    planType: 'month',
    price: 12,
    currency: '$',
    marketingMessage: '2 months free',
  },
  {
    planTitle: 'Pro',
    planType: 'month',
    price: 15,
    currency: '$',
    marketingMessage: '2 months free',
  },
];

const getCheckedIndex = (title: PlanTitle | null) => {
  switch (title) {
    case 'Arcade':
      return 0;
    case 'Advanced':
      return 1;
    case 'Pro':
      return 2;
    default:
      return null;
  }
};

export function FormPlan({
  planType: checkedPlanType,
  planTitle: checkedPlanTitle,
  updatePlan,
}: FormPlanProps) {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(
    getCheckedIndex(checkedPlanTitle)
  );

  const [checkedPlan, setCheckedPlan] = useState(checkedPlanTitle);
  const [period, setPeriod] = useState(checkedPlanType);

  const handlePlanCheck = (index: number, planTitle: PlanTitle | null) => {
    setCheckedIndex(index);
    setCheckedPlan(planTitle);
    if (planTitle) {
      updatePlan(planTitle, period);
    }
  };

  const changePeriod = () => {
    console.log('changePeriod');
    setPeriod((prev) => {
      return prev === 'month' ? 'year' : 'month';
    });
    const newPeriod = period === 'month' ? 'year' : 'month';
    updatePlan(checkedPlan, newPeriod);
  };

  return (
    <SubfromWrapper
      title='Select your plan'
      subtitle='You have the option of monthly or yearly billing'
    >
      <div className='plans-wrapper'>
        {PLANS_DATA.map((plan, index) => (
          <InputPlan
            key={plan.planTitle}
            index={index}
            checkedIndex={checkedIndex}
            plan={plan}
            onCheck={handlePlanCheck}
            period={period}
          />
        ))}
      </div>

      <SliderCheckbox
        leftLabel='Monthly'
        rightLabel='Yearly'
        onChangePeriod={changePeriod}
        isChecked={period === 'year'}
      />
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
  period,
}: InputPlanProps) {
  const inputClass =
    index === checkedIndex
      ? 'subform-plan-input ease-in duration-100 checked'
      : 'subform-plan-input ease-in duration-100';

  const messageClass =
    period === 'month'
      ? 'font-[Ubuntu-Medium] text-[var(--color-prime-marine-blue)] text-xs ease-in duration-300 h-0'
      : 'font-[Ubuntu-Medium] text-[var(--color-prime-marine-blue)] text-xs ease-in duration-300 h-4';

  return (
    <div className={inputClass} onClick={() => onCheck(index, plan.planTitle)}>
      {' '}
      <PlanBadge title={plan.planTitle} />
      <div className=''>
        <h3 className='font-[Ubuntu-Bold] text-[var(--color-prime-marine-blue)] text-sm'>
          {plan.planTitle}
        </h3>
        <p className='font-[Ubuntu-Regular] text-[var(--color-neutral-cool-gray)] text-xs'>
          {plan.currency}{' '}
          {period === 'month' ? `${plan.price}/mo` : `${plan.price * 10}/yr`}
        </p>
        <p className={messageClass}>
          {period === 'year' && plan.marketingMessage}
        </p>
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
      return <img src={IconArcade} alt='default plan'></img>;
      break;
  }
}
