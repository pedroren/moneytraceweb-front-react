import React, { useEffect, useState } from 'react';
import MyInputControl from '../UI/MyInputControl';
import { useSelector } from 'react-redux';
import MyButton from '../UI/MyButton';
import { Account } from '../../api/models';
import FormContainer from '../UI/FormContainer';
import useInputValidator from '../../hooks/use-input-val';
import MyModal from '../UI/MyModal';

const AccountForm = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.open);
  }, [props.open]);

  const list = useSelector((state) => state.basics.accountList);
  const {
    value: nameValue,
    setValue: setNameValue,
    isValid: isNameValid,
    isTouched: isNameTouched,
    onChangeHandler: nameChangeHandler,
  } = useInputValidator();
  const {
    value: balanceValue,
    setValue: setBalanceValue,
    isValid: isBalanceValid,
    isTouched: isBalanceTouched,
    onChangeHandler: balanceChangeHandler,
  } = useInputValidator(0);
  const {
    value: enabledValue,
    setValue: setEnabledValue,
    isValid: isEnabledValid,
    isTouched: isEnabledTouched,
    onChangeHandler: enabledChangeHandler,
  } = useInputValidator(true);
  const formIsValid = isNameValid;

  const submitHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!formIsValid) {
      return;
    }
    let record = new Account(nameValue, enabledValue, balanceValue, props.id);
    props.onSave(record);
  };
  useEffect(() => {
    if (props.id) {
      const currentRecord = list.find((item) => item._id === props.id);
      if (currentRecord) {
        setNameValue(currentRecord.name);
        setEnabledValue(currentRecord.enabled);
        setBalanceValue(currentRecord.balance);
      }
    }
  }, [props.id]);

  const closeModalHandler = () => {
    setModalOpen(false);
    props.onClose && props.onClose();
  };

  return (
    <MyModal
      title='Account'
      okButton
      okTitle='Save'
      onOk={submitHandler}
      open={modalOpen}
      onClose={closeModalHandler}
      disableOk={!formIsValid}
    >
      <form onSubmit={submitHandler} className='flex flex-col'>
        <FormContainer size='lg'>
          <MyInputControl
            label='Name'
            value={nameValue}
            onChange={nameChangeHandler}
            error={!isNameValid && isNameTouched ? 'Required' : null}
          ></MyInputControl>
          <MyInputControl
            label='Balance'
            value={balanceValue}
            onChange={balanceChangeHandler}
            error={!isBalanceValid && isBalanceTouched ? 'Required' : null}
          ></MyInputControl>
          <MyInputControl
            label='Enabled'
            value={enabledValue}
            onChange={enabledChangeHandler}
            error={!isEnabledValid && isEnabledTouched ? 'Required' : null}
            type='checkbox'
          ></MyInputControl>
        </FormContainer>
      </form>
    </MyModal>
  );
};

export default AccountForm;
