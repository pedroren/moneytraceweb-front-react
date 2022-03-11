import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { JSUtils } from '../../jsutils';

//props -> data
//props -> valueField
//props -> displayField
//props -> value
//props -> label
//props -> error
const DropDownList = (props) => {
  const [value, setValue] = useState('');
  const controlId = JSUtils.getRandomID();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange){
      props.onChange(event.target.value);
    }
  };

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
    <FormControl fullWidth error={!!errorMsg}>
      <InputLabel id={'select-label-' + controlId}>{props.label}</InputLabel>
      <Select
        labelId={'select-label-' + controlId}
        id={'select-' + controlId}
        value={value}
        label={props.label}
        onChange={handleChange}
      >
        {props.data && props.data.map((item) => (
          <MenuItem value={item[props.valueField]} key={item[props.valueField]}>
            {item[props.displayField]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownList;
