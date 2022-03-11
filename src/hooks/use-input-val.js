import { useEffect, useState } from 'react';

const validateValue = (value) => {
  if (value !== null && value !== undefined) {
    if (typeof value == "boolean") {
      return true;
    }
    if (isNaN(value)) {
      //Not number
      if (typeof value === 'object' && !Array.isArray(value)) {
        //Date?
        return value > 0;
      }
      else {
        //string
        return value.trim().length > 0;
      }
    } 
    else {
      //numeric
      return value > 0;
    }
  }
  else {
    //null or undefined
    return false;
  }
};

const useInputValidator = (defaultValue, customValidator) => {
  const [value, setValue] = useState(defaultValue ?? null);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = customValidator ? customValidator(value) : validateValue(value);

  useEffect(() => {
    if (value !== undefined && !isTouched) {
      setIsTouched(true);
    }
  }, [value, isTouched]);

  const onChangeHandler = (inputValue) => {
    setValue(inputValue);
  };

  return {
    value,
    setValue,
    isValid,
    isTouched,
    onChangeHandler,
  };
};

export default useInputValidator;
