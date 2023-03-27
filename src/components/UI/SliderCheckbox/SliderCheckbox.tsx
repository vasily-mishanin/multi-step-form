import { FormEvent, useState } from 'react';
import { PlanType } from '../../../model/types';
import './SliderCheckbox.scss';

type SliderCheckboxProps = {
  leftLabel: string;
  rightLabel: string;
  isChecked: boolean;
  onChangePeriod: (period: PlanType) => void;
};

export function SliderCheckbox({
  leftLabel,
  rightLabel,
  onChangePeriod,
  isChecked,
}: SliderCheckboxProps) {
  const [checked, setChecked] = useState<'LEFT' | 'RIGHT'>(
    isChecked ? 'RIGHT' : 'LEFT'
  );

  const handleCheck = (e: FormEvent) => {
    setChecked((prev) => {
      return prev === 'LEFT' ? 'RIGHT' : 'LEFT';
    });

    const value = (e.target as HTMLInputElement).value;
    if (value === 'year') {
      onChangePeriod(value);
      return;
    }
    onChangePeriod('month');
  };

  const leftLabelClass =
    checked === 'LEFT'
      ? 'text-[var(--color-prime-marine-blue)]'
      : 'text-[var(--color-neutral-cool-gray)]';
  const rightLabelClass =
    checked === 'RIGHT'
      ? 'text-[var(--color-prime-marine-blue)]'
      : 'text-[var(--color-neutral-cool-gray)]';

  return (
    <div className='slider-checkbox flex gap-6 h-12 justify-center items-center w-full bg-[var(--color-neutral-magnolia)] rounded-lg'>
      <label htmlFor='planType' className={leftLabelClass}>
        {leftLabel}
      </label>
      <input
        type='checkbox'
        id='planType'
        value='year'
        onChange={handleCheck}
        checked={isChecked}
      />
      <label htmlFor='planType' className={rightLabelClass}>
        {rightLabel}
      </label>
    </div>
  );
}
