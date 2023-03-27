import { IAddOn, PlanType } from '../../model/types';
import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';
import './FormAddOns.scss';

const ADD_ONS: IAddOn[] = [
  {
    title: 'Online service',
    description: 'Access to multiplayer games',
    checked: false,
    price: 1,
  },
  {
    title: 'Larger storage',
    description: 'Extra 1TB of cloud safe',
    checked: false,
    price: 2,
  },
  {
    title: 'Castomazible profile',
    description: 'Custom theme on your profile',
    checked: false,
    price: 2,
  },
];

type FormAddOnsProps = {
  checkedAddOns: IAddOn[];
  updateAddOn: (addOn: IAddOn) => void;
  planType: PlanType;
  iAmValid: (val: boolean) => void;
};

type InputAddOnsProps = {
  title: string;
  description: string;
  price: number;
  planType: PlanType;
  onAddOnCheck: (addOn: IAddOn) => void;
  isCheked: boolean;
};

export function FormAddOns({
  checkedAddOns,
  planType,
  updateAddOn,
  iAmValid,
}: FormAddOnsProps) {
  return (
    <SubfromWrapper
      title='Pick add-ons'
      subtitle='Add-ons help enhance your gaming experience'
    >
      <div className='flex flex-col gap-4'>
        {ADD_ONS.map((item) => {
          const isChecked = checkedAddOns.some(
            (addOn) => addOn.title === item.title
          );
          return (
            <InputAddOns
              key={item.title}
              title={item.title}
              description={item.description}
              price={item.price}
              planType={planType}
              onAddOnCheck={updateAddOn}
              isCheked={isChecked}
            />
          );
        })}
      </div>
    </SubfromWrapper>
  );
}

function InputAddOns({
  title,
  description,
  price,
  planType,
  onAddOnCheck,
  isCheked,
}: InputAddOnsProps) {
  const handleAddOnCheck = () => {
    const newAddOn: IAddOn = {
      title: title,
      description: description,
      checked: true,
      price: planType === 'month' ? price : price * 10,
    };
    onAddOnCheck(newAddOn);
  };

  const renderedPrice =
    planType === 'month' ? `+$${price}/mo` : `+$${price * 10}/yr`;

  return (
    <label className='addon-label' htmlFor={title}>
      <input
        className='addon-input'
        type='checkbox'
        name={title}
        id={title}
        checked={isCheked}
        onChange={handleAddOnCheck}
      />
      <div>
        <h3 className='addon-title'>{title}</h3>
        <h4 className='addon-description'>{description}</h4>
      </div>
      <p className='addon-price'>{renderedPrice}</p>
    </label>
  );
}
