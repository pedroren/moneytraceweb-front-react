import React, { useEffect, useState } from 'react';
import MyInputControl from '../UI/MyInputControl';
import DropDownList from '../UI/DropDownList';
import { useSelector } from 'react-redux';
import MyButton from '../UI/MyButton';
import { Category } from '../../api/models';
import FormContainer from '../UI/FormContainer';
import useInputValidator from '../../hooks/use-input-val';
import MyModal from '../UI/MyModal';

const CategoryForm = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(props.open);
  }, [props.open]);

  const catTypeList = useSelector((state) => state.basics.categoryTypeList);
  const list = useSelector((state) => state.basics.categoryList);
  const {
    value: nameValue,
    setValue: setNameValue,
    isValid: isNameValid,
    isTouched: isNameTouched,
    onChangeHandler: nameChangeHandler,
  } = useInputValidator();
  const {
    value: catTypeValue,
    setValue: setCatTypeValue,
    isValid: isCatTypeValid,
    isTouched: isCatTypeTouched,
    onChangeHandler: catTypeChangeHandler,
  } = useInputValidator();
  const {
    value: enabledValue,
    setValue: setEnabledValue,
    isValid: isEnabledValid,
    isTouched: isEnabledTouched,
    onChangeHandler: enabledChangeHandler,
  } = useInputValidator(true);
  const formIsValid = isNameValid && isCatTypeValid;

  const submitHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!formIsValid) {
      return;
    }
    let record = new Category(nameValue, catTypeValue, enabledValue, props.id);
    props.onSave(record);
  };

  useEffect(() => {
    if (props.id) {
      const currentRecord = list.find((item) => item._id === props.id);
      if (currentRecord) {
        console.log('editing', currentRecord);
        setNameValue(currentRecord.name);
        setCatTypeValue(currentRecord.categoryTypeId);
        setEnabledValue(currentRecord.enabled);
      }
    }
  }, [props.id]);

  const closeModalHandler = () => {
    setModalOpen(false);
    props.onClose && props.onClose();
  };

  return (
    <MyModal
      title='Category'
      okButton
      okTitle='Save'
      onOk={submitHandler}
      open={modalOpen}
      onClose={closeModalHandler}
      disableOk={!formIsValid}
    >
      <form onSubmit={submitHandler} className='flex flex-col'>
        <FormContainer size='lg'>
          <span></span>
          <MyInputControl
            label='Name'
            value={nameValue}
            onChange={nameChangeHandler}
            error={!isNameValid && isNameTouched ? 'Required' : null}
          ></MyInputControl>
          <MyInputControl
            label='Enabled'
            value={enabledValue}
            onChange={enabledChangeHandler}
            error={!isEnabledValid && isEnabledTouched ? 'Required' : null}
            type='checkbox'
          ></MyInputControl>
          <DropDownList
            data={catTypeList}
            value={catTypeValue}
            valueField='_id'
            displayField='name'
            label='Type'
            onChange={catTypeChangeHandler}
            error={!isCatTypeValid && isCatTypeTouched ? 'Required' : null}
          ></DropDownList>
        </FormContainer>
      </form>
    </MyModal>
  );
};

export default CategoryForm;
