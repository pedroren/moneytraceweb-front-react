import { useEffect, useState } from 'react';
import DateFormatter from './DateFormatter';

const FancyDate = (props) => {
  const [value, setValue] = useState(props.date)
  useEffect(() => {
    if (props.date instanceof Date) {
      setValue(props.date);
    }
    else {
      setValue(new Date(props.date));
    }
  }, [props.date])
  return (
    <div>
      <div className='flex flex-col border rounded-lg border-gray-200'>
        <div className='flex justify-center px-1'>
          <DateFormatter value={value} datepart='monthname' />
        </div>
        <div className='flex justify-center bg-gray-200 px-1'>
          <DateFormatter value={value} datepart='day' />
        </div>
        <div className='px-1'>
          <DateFormatter value={value} datepart='year' />
        </div>
      </div>
    </div>
  );
};

export default FancyDate;
