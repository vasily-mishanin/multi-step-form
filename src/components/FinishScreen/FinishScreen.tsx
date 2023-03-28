import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';
import IconCheckMark from '../../assets/images/icon-thank-you.svg';

export function FinishScreen() {
  return (
    <SubfromWrapper title='' subtitle=''>
      <article className='flex flex-col items-center text-center font-[Ubuntu-Medium] text-[var(--color-neutral-cool-gray)] my-12'>
        <img
          className='w-12 h-12 mb-6 md:w-16 md:h-16'
          src={IconCheckMark}
          alt='finished'
        />
        <h1 className='font-[Ubuntu-Bold] text-2xl text-[var(--color-prime-marine-blue)] mb-3 md:text-3xl'>
          Thank you!
        </h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </article>
    </SubfromWrapper>
  );
}
