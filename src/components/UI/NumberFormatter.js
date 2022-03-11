import React, { useEffect, useState } from "react";

const NumberFormatter = props => {
  const [formattedValue, setFormattedValue]  = useState();
  useEffect(() => {
    if (props.value) {
      const numericValue = (isNaN(props.value)) ? 0 : props.value;
      setFormattedValue(numericValue.toFixed(2));
    }
  }, [props.value])
  //const formattedValue = '$'+props.value.toFixed(2);
  return <React.Fragment>{formattedValue}</React.Fragment>
}

export default NumberFormatter;