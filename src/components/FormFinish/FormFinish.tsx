import './FormFinish.scss';
import { IAddOn, IPlan } from '../../model/types';
import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';

type FormFinishProps = {
  plan: IPlan;
  addOns: IAddOn[];
  goToPlans: () => void;
};

export function FormFinish({ plan, addOns, goToPlans }: FormFinishProps) {
  const totalPrice =
    plan.price + addOns.reduce((acc, curr) => acc + curr.price, 0);
  const totalText = `Total (per ${
    plan.planType === 'month' ? 'month' : 'year'
  })`;

  const planText = `${plan.planTitle} (${
    plan.planType === 'month' ? 'Monthly' : 'Yearly'
  })`;

  const pricePeriod = plan.planType === 'month' ? 'mo' : 'yr';
  return (
    <SubfromWrapper
      title='Finishing up'
      subtitle='Double-check everything looks OK before confirming.'
    >
      <section className='finishing-form'>
        <div className='rounded-lg bg-[var(--color-neutral-magnolia)] mb-4 px-4'>
          <div className='totals-list-item'>
            <p className='flex flex-col gap-1 items-start'>
              <span className='font-[Ubuntu-Bold] text-[var(--color-prime-marine-blue)]'>
                {planText}
              </span>{' '}
              <button
                className='text-[var(--color-neutral-cool-gray)] text-sm underline hover:text-[var(--color-prime-purplish-blue)]'
                type='button'
                onClick={goToPlans}
              >
                Change
              </button>
            </p>
            <span className='font-[Ubuntu-Bold] text-[var(--color-prime-marine-blue)] text-sm'>{`+$${plan.price}/${pricePeriod}`}</span>
          </div>

          <hr />

          {addOns.map((addOn) => (
            <p key={addOn.title} className='totals-list-item'>
              <span className='text-[var(--color-neutral-cool-gray)]'>
                {addOn.title}
              </span>{' '}
              <span className='text-[var(--color-prime-marine-blue)] text-sm'>{`+$${addOn.price}/${pricePeriod}`}</span>
            </p>
          ))}
        </div>

        <p className='totals-list-item  px-4'>
          <span className='text-[var(--color-neutral-cool-gray)]'>
            {totalText}
          </span>{' '}
          <span className='font-[Ubuntu-Bold] text-[var(--color-prime-purplish-blue)]'>{`+$${totalPrice}/${pricePeriod}`}</span>
        </p>
      </section>
    </SubfromWrapper>
  );
}
