import { FormEvent } from 'react';
import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';
import './FormPersonal.scss';

type UserData = {
  name: string;
  email: string;
  phone: string;
};

type FormPersonalProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (fields: Partial<UserData>) => void;
  required?: boolean;
  errorMsg?: string;
};
// 'e.g. Stephen King'

export function FormPersonal({
  name,
  email,
  phone,
  updateFields,
}: FormPersonalProps) {
  return (
    <SubfromWrapper
      title='Personal info'
      subtitle='Please provide your name, email address, and phone number'
    >
      <Input
        type='text'
        name='name'
        label='Name'
        placeholder='e.g. Stephen King'
        required
        value={name}
        onValueChange={updateFields}
        errorMsg='This field is required'
      />
      <Input
        type='email'
        name='email'
        label='Email Address'
        placeholder='e.g. stephenking@lorem.com'
        required
        value={email}
        onValueChange={updateFields}
        errorMsg='This field is required'
      />
      <Input
        type='tel'
        name='phone'
        label='Phone Number'
        placeholder='e.g. +1 234 567 890'
        required
        value={phone}
        onValueChange={updateFields}
        errorMsg='This field is required'
      />
    </SubfromWrapper>
  );
}

function Input({
  type,
  name,
  label,
  placeholder,
  required,
  errorMsg,
  onValueChange,
  value,
}: InputProps) {
  const handleInput = (event: FormEvent) => {
    //validate
    const value = (event.target as HTMLInputElement).value;
    onValueChange({ [name]: value });
  };
  return (
    <div className='subform-input'>
      <div className='flex justify-between'>
        <label htmlFor={name}>{label}</label>
        <p className='error-message'>{errorMsg}</p>
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        onChange={handleInput}
        value={value}
      />
    </div>
  );
}
