import { Step } from '../../model/types';
import { StepBadge } from '../UI/StepBadge/StepBadge';
import './StepsSection.scss';

type StepsSectionProps = {
  steps: Step[];
  activeStepNumber: number;
};

const BREAKPOINT_M = 768;

export function StepsSection({ steps, activeStepNumber }: StepsSectionProps) {
  const clientScreenWidth = window.innerWidth;

  return (
    <section className='steps-section'>
      <ul className='flex gap-4 md:flex-col'>
        {steps.map((s, i) => (
          <li key={s.name} className='flex gap-4 items-center'>
            <StepBadge value={i + 1} isActive={i === activeStepNumber - 1} />
            {clientScreenWidth >= BREAKPOINT_M && (
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
