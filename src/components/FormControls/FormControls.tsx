import './FormControls.scss';

type StepsControlsProps = {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  nextIsDisabled: boolean;
};

export default function FormControls({
  onNext,
  onBack,
  currentStep,
  nextIsDisabled,
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
      <button
        className={currentStep < 4 ? 'btn-next' : 'btn-confirm'}
        onClick={onNext}
        type='button'
        disabled={nextIsDisabled}
      >
        {currentStep === 4 ? 'Confirm' : 'Next Step'}
      </button>
    </div>
  );
}
