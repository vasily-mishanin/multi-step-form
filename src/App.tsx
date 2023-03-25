import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import StepForm from './components/StepForm/StepForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <StepForm />
    </div>
  );
}

export default App;
