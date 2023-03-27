import { FormEvent, useEffect, useRef, useState } from 'react';
import { SubfromWrapper } from '../SubfromWrapper/SubfromWrapper';
import './FormPersonal.scss';

type UserData = {
  name: string;
  email: string;
  phone: string;
};

type FormPersonalProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
  iAmValid: (val: boolean) => void;
};

type InputName = 'name' | 'email' | 'phone';

type InputProps = {
  type: string;
  name: InputName;
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (fields: Partial<UserData>) => void;
  iAmValid: (val: boolean) => void;
  required?: boolean;
  errorMsg?: string;
};
// 'e.g. Stephen King'

export function FormPersonal({
  name,
  email,
  phone,
  updateFields,
  iAmValid,
}: FormPersonalProps) {
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    if (isNameValid && isEmailValid && isPhoneValid) {
      iAmValid(true);
    } else {
      iAmValid(false);
    }
  }, [isNameValid, isEmailValid, isPhoneValid]);

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
        iAmValid={(val) => setIsNameValid(val)}
        errorMsg='Name is required'
      />
      <Input
        type='email'
        name='email'
        label='Email Address'
        placeholder='e.g. stephenking@lorem.com'
        required
        value={email}
        onValueChange={updateFields}
        iAmValid={(val) => setIsEmailValid(val)}
        errorMsg='Please enter a valid email'
      />
      <Input
        type='tel'
        name='phone'
        label='Phone Number'
        placeholder='e.g. +1 234 567 890'
        required
        value={phone}
        onValueChange={updateFields}
        iAmValid={(val) => setIsPhoneValid(val)}
        errorMsg='Should be from 9 to 11 digits'
      />
    </SubfromWrapper>
  );
}

// ELEMENTS

function Input({
  type,
  name,
  label,
  placeholder,
  required,
  errorMsg,
  onValueChange,
  value,
  iAmValid,
}: InputProps) {
  const [isValid, setIsValid] = useState(true);
  const [localValue, setLocalValue] = useState(value);

  const didMount = useRef(false);

  const handleInput = (event: FormEvent) => {
    //validate
    const enteredValue = (event.target as HTMLInputElement).value;
    if (validate(name, enteredValue)) {
      setIsValid(true);
      onValueChange({ [name]: enteredValue });
      iAmValid(true);
    } else {
      setIsValid(false);
      iAmValid(false);
    }
    setLocalValue(enteredValue);
  };

  // one time after refresh
  useEffect(() => {
    if (!didMount.current) {
      if (value) {
        iAmValid(true);
      } else {
        iAmValid(false);
      }
      didMount.current = true;
    }
  }, []);

  const inputErrorStyle = {
    border: '1px solid var(--color-prime-strawberry-blue)',
  };

  return (
    <div className='subform-input'>
      <div className='flex justify-between'>
        <label htmlFor={name}>{label}</label>
        <p className='error-message'>{!isValid && errorMsg}</p>
      </div>
      <input
        style={!isValid ? inputErrorStyle : {}}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        onChange={handleInput}
        value={localValue}
      />
    </div>
  );
}

function validate(name: InputName, value: string) {
  if (name === 'name') {
    return value.length > 0;
  }

  if (name === 'email') {
    return (
      value.length > 0 &&
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ); // email like "email.mail.com"
  }

  if (name === 'phone') {
    return value.length > 0 && /^\d{9,11}$/.test(value); // from 9 to 11 digits
  }

  return false;
}
