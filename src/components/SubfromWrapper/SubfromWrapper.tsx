import { ReactNode } from 'react';
import './SubfromWrapper.scss';

type FieldsWrapperProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function SubfromWrapper({
  title,
  subtitle,
  children,
}: FieldsWrapperProps) {
  return (
    <div className='subform-wrapper'>
      <h1 className='subform-title'>{title}</h1>
      <h2 className='subform-subtitle'>{subtitle}</h2>
      {children}
    </div>
  );
}
