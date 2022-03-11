import React, { useEffect, useState } from 'react';

const DateFormatter = (props) => {
  const [formattedValue, setformattedValue] = useState()

  //props => datepart {day, month, monthname, year, weekday}
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  if (props.datepart){
    if (props.datepart === 'day') {
      options = { day: 'numeric'};
    }
    else if (props.datepart === 'month') {
      options = { month: 'numeric'};
    } else
    if (props.datepart === 'monthname') {
      options = { month: 'short'};
    }
    else
    if (props.datepart === 'year') {
      options = { year: 'numeric'};
    }
    else
    if (props.datepart === 'weekday') {
      options = { weekday: 'short'};
    }
  }

  useEffect(() => {
    if (props.value) {
      const dateValue = (props.value instanceof Date) ? props.value : new Date(props.value);
      setformattedValue(dateValue.toLocaleDateString('en-US', options));
    }
  }, [props.value, options])

  return <React.Fragment>{formattedValue}</React.Fragment>;
};

export default DateFormatter;
