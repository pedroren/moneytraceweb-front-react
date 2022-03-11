import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DropDownList from '../UI/DropDownList';
import MyDateControl from '../UI/MyDateControl';
import MyInputControl from '../UI/MyInputControl';
import MyButton from '../UI/MyButton';
import MoneyTraceApi from '../../api';
import FormContainer from '../UI/FormContainer';
import useInputValidator from '../../hooks/use-input-val';

const TransactionForm = (props) => {
  const accountList = useSelector((state) => state.basics.accountList);
  const categoryList = useSelector((state) => state.basics.categoryList);
  const token = useSelector((state) => state.auth.token);

  const {
    value: dateValue,
    setValue: setDateValue,
    isValid: isDateValid,
    isTouched: isDateTouched,
    onChangeHandler: dateChangeHandler,
  } = useInputValidator();
  const {
    value: nameValue,
    setValue: setNameValue,
    isValid: isNameValid,
    isTouched: isNameTouched,
    onChangeHandler: nameChangeHandler,
  } = useInputValidator();
  const {
    value: amountValue,
    setValue: setAmountValue,
    isValid: isAmountValid,
    isTouched: isAmountTouched,
    onChangeHandler: amountChangeHandler,
  } = useInputValidator(0);
  const {
    value: accountValue,
    setValue: setAccountValue,
    isValid: isAccountValid,
    isTouched: isAccountTouched,
    onChangeHandler: accountChangeHandler,
  } = useInputValidator(0);
  const {
    value: categoryValue,
    setValue: setCategoryValue,
    isValid: isCategoryValid,
    isTouched: isCategoryTouched,
    onChangeHandler: categoryChangeHandler,
  } = useInputValidator(0);
  const formIsValid =
    isDateValid &&
    isNameValid &&
    isAmountValid &&
    isAccountValid &&
    isCategoryValid;

  useEffect(() => {
    if (props.id) {
      const api = new MoneyTraceApi(token);
      api.getTransactionById(props.id).then((res) => {
        const record = res.data;
        console.log(record);
        setDateValue(record.date);
        setNameValue(record.name);
        setAmountValue(record.amount);
        setCategoryValue(record.categoryId);
        setAccountValue(record.accountId);
      });
    }
  }, [props.id]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const record = {
      _id: props.id,
      date: dateValue,
      name: nameValue,
      amount: +amountValue,
      categoryId: categoryValue,
      accountId: accountValue,
    };
    console.log(record);
    props.onSave(record);
  };

  return (
    <form onSubmit={submitHandler}>
      <FormContainer>
        <MyDateControl
          label='Date'
          onChange={dateChangeHandler}
          value={dateValue}
          error={!isDateValid && isDateTouched ? 'Required' : null}
        />
        <MyInputControl
          label='Name'
          onChange={nameChangeHandler}
          value={nameValue}
          error={!isNameValid && isNameTouched ? 'Required' : null}
        ></MyInputControl>
        <MyInputControl
          label='Amount'
          type='number'
          onChange={amountChangeHandler}
          value={amountValue}
          error={!isAmountValid && isAmountTouched ? 'Required' : null}
        ></MyInputControl>
        <DropDownList
          data={accountList}
          label='Account'
          valueField='_id'
          displayField='name'
          onChange={accountChangeHandler}
          value={accountValue}
          error={!isAccountValid && isAccountTouched ? 'Required' : null}
        ></DropDownList>
        <DropDownList
          data={categoryList}
          label='Category'
          valueField='_id'
          displayField='name'
          onChange={categoryChangeHandler}
          value={categoryValue}
          error={!isCategoryValid && isCategoryTouched ? 'Required' : null}
        ></DropDownList>
        <MyButton variant='save' submit disabled={!formIsValid}>
          Save
        </MyButton>
        <MyButton linkto='/transactions'>Cancel</MyButton>
      </FormContainer>
    </form>
  );
};

export default TransactionForm;
