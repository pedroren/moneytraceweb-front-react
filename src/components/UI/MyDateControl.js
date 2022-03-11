import React, { useEffect, useState } from 'react';
// or @mui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';


const MyDateControl = (props) => {
  const [value, setValue] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onChangeHandler = newValue => {
    setValue(newValue);
    props.onChange(newValue);
  }
  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value])

  useEffect(() => {
    if (props.error){
      setErrorMsg(props.error);
    }
    else {
      setErrorMsg(null);
    }
  },[props.error])

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={props.label}
          value={value}
          onChange={onChangeHandler}
          renderInput={(params) => <TextField {...params} />}
          helperText={errorMsg}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default MyDateControl;
