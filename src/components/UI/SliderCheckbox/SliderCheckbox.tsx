import { useState } from 'react';
import './SliderCheckbox.scss';

type SliderCheckboxProps = {
  leftLabel: string;
  rightLabel: string;
};

export function SliderCheckbox({ leftLabel, rightLabel }: SliderCheckboxProps) {
  const [checked, setChecked] = useState<'LEFT' | 'RIGHT'>('LEFT');

  const handleCheck = () => {
    setChecked((prev) => {
      return prev === 'LEFT' ? 'RIGHT' : 'LEFT';
    });
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
      <input type='checkbox' id='planType' onChange={handleCheck} />
      <label htmlFor='planType' className={rightLabelClass}>
        {rightLabel}
      </label>
    </div>
  );
}
