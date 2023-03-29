import { useState } from 'react';
import { Step } from '../../model/types';
import { StepBadge } from '../UI/StepBadge/StepBadge';
import './StepsSection.scss';

type StepsSectionProps = {
  steps: Step[];
  activeStepNumber: number;
};

const BREAKPOINT_M = 667; // landscape for small iPhone SE

export function StepsSection({ steps, activeStepNumber }: StepsSectionProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  window.addEventListener('orientationchange', function () {
    console.log('orientationchange', screen.width);
    setInnerWidth(screen.width);
  });

  return (
    <section className='steps-section'>
      <ul className='steps-section-list flex gap-4'>
        {steps.map((s, i) => (
          <li key={s.name} className='flex gap-4 items-center'>
            <StepBadge value={i + 1} isActive={i === activeStepNumber - 1} />
            {innerWidth >= BREAKPOINT_M && (
              <div>
                <p className='text-[var(--color-neutral-cool-gray)]'>
                  {s.name}
                </p>
                <p className='text-[var(--color-neutral-magnolia)] font-[Ubuntu-Bold]'>
                  {s.title}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
