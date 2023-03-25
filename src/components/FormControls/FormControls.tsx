import './FormControls.scss';

type StepsControlsProps = {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
};

export default function FormControls({
  onNext,
  onBack,
  currentStep,
}: StepsControlsProps) {
  return (
    <div className='steps-controls flex justify-between p-4 w-[100%]'>
      <button
        className={'btn-back' + (currentStep <= 1 ? ' invisible' : '')}
        onClick={onBack}
        type='button'
      >
        Go Back
      </button>
      <button className='btn-next' onClick={onNext} type='button'>
        Next Step
      </button>
    </div>
  );
}
