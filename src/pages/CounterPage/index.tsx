import React, { useState } from 'react';
import Button from '../../components/Button';
import CounterText from '../../components/CounterText';

const CounterPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const onClickHandler = (action: string) => {
    action === 'increment' ? setValue(value + 1) : setValue(value - 1);
  };
  return (
    <>
      <h1>Counter</h1>
      <div>
        <CounterText>{value}</CounterText>
        <Button onClickHandler={() => onClickHandler('increment')}>
          Increment
        </Button>
        <Button onClickHandler={() => onClickHandler('decrement')}>
          Decrement
        </Button>
      </div>
    </>
  );
};

export default CounterPage;
