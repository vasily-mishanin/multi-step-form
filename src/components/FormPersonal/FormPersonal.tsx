import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';
import './FormPersonal.scss';

type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  errorMsg?: string;
};
// 'e.g. Stephen King'

export function FormPersonal() {
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
        // errorMsg='This field is required'
      />
      <Input
        type='email'
        name='email'
        label='Email Address'
        placeholder='e.g. stephenking@lorem.com'
        required
        // errorMsg='This field is required'
      />
      <Input
        type='tel'
        name='tel'
        label='Phone Number'
        placeholder='e.g. +1 234 567 890'
        required
        // errorMsg='This field is required'
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
}: InputProps) {
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
      />
    </div>
  );
}
