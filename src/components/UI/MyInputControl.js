import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { JSUtils } from '../../jsutils';

const MyInputControl = (props) => {
  //props -> value
  //props -> label
  //props -> type [text, area, number, password, checkbox]
  //props -> required
  //props -> enabled
  //props -> error
  const controlId = JSUtils.getRandomID();
  const defaultValue =
    props.value === undefined || props.value === null
      ? props.type === 'number'
        ? 0
        : props.type === 'checkbox'
        ? false
        : ''
      : props.value;

  const [value, setValue] = useState(defaultValue);
  const [errorMsg, setErrorMsg] = useState(null);

  const onChangeHandler = (event) => {
    if (props.type !== 'checkbox') {
      //setValue(event.target.value);
      props.onChange(event.target.value);
    } else {
      //setValue(event.target.checked);
      props.onChange(event.target.checked);
    }
  };

  useEffect(() => {
    if (value !== props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  // useEffect(() => {
  //   if (value !== props.value) {
  //     props.onChange(value);
  //   }
  // }, [value]);

  useEffect(() => {
    if (props.error) {
      setErrorMsg(props.error);
    } else {
      setErrorMsg(null);
    }
  }, [props.error]);

  let inputSnippet;
  if (props.type !== 'checkbox') {
    inputSnippet = (
      <FormControl variant='standard' fullWidth error={!!errorMsg}>
        <InputLabel htmlFor={'input' + controlId}>{props.label}</InputLabel>
        <Input
          id={'input' + controlId}
          value={value}
          onChange={onChangeHandler}
          type={props.type}
          multiline={props.type === 'area'}
          inputProps={
            props.type === 'number'
              ? {
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  'aria-label': 'controlled',
                }
              : { 'aria-label': 'controlled' }
          }
          aria-describedby={'error-text' + controlId}
        />
        <FormHelperText id={'error-text' + controlId}>
          {errorMsg}
        </FormHelperText>
      </FormControl>
    );
  } else {
    inputSnippet = (
      <FormControl variant='standard' fullWidth error={!!errorMsg}>
        <FormControlLabel
          value={'input' + controlId}
          control={
            <Switch
              color='primary'
              checked={value}
              onChange={onChangeHandler}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label={props.label}
          labelPlacement='start'
        />
      </FormControl>
    );
  }
  return <React.Fragment>{inputSnippet}</React.Fragment>;
};

export default MyInputControl;
