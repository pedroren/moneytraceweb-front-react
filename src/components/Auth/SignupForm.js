import useInputValidator from "../../hooks/use-input-val";
import FormContainer from "../UI/FormContainer";
import MyButton from "../UI/MyButton";
import MyInputControl from "../UI/MyInputControl";

const SignupForm = (props) => {
  const {
    value: nameValue,
    setValue: setNameValue,
    isValid: isNameValid,
    isTouched: isNameTouched,
    onChangeHandler: nameChangeHandler,
  } = useInputValidator();
  const {
    value: emailValue,
    setValue: setEmailValue,
    isValid: isEmailValid,
    isTouched: isEmailTouched,
    onChangeHandler: emailChangeHandler,
  } = useInputValidator();
  const {
    value: passwordValue,
    setValue: setPasswordValue,
    isValid: isPasswordValid,
    isTouched: isPasswordTouched,
    onChangeHandler: passwordChangeHandler,
  } = useInputValidator();

  const validateConfirmPass = value => {
    return value && value === passwordValue;
  }
  const {
    value: confirmPassValue,
    setValue: setConfirmPassValue,
    isValid: isConfirmPassValid,
    isTouched: isConfirmPassTouched,
    onChangeHandler: confirmPassChangeHandler,
  } = useInputValidator(null, validateConfirmPass);
  const formIsValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPassValid;

  const submitHandler = (event) => {
    event.preventDefault();
    if(!formIsValid){
      return;
    }
    let record = {name: nameValue, email: emailValue, password: passwordValue};
    props.onSave(record);
  };

  return (
    <form onSubmit={submitHandler} className='flex flex-col'>
      <FormContainer size='md'>
      <MyInputControl
          label='Name'
          value={nameValue}
          onChange={nameChangeHandler}
          error={!isNameValid && isNameTouched ? 'Required' : null}
        ></MyInputControl>
        <MyInputControl
          label='Email'
          type='email'
          value={emailValue}
          onChange={emailChangeHandler}
          error={!isEmailValid && isEmailTouched ? 'Required' : null}
        ></MyInputControl>
        <MyInputControl
          label='Password'
          type='password'
          value={passwordValue}
          onChange={passwordChangeHandler}
          error={!isPasswordValid && isPasswordTouched ? 'Required' : null}
        ></MyInputControl>
        <MyInputControl
          label='Confirm Password'
          type='password'
          value={confirmPassValue}
          onChange={confirmPassChangeHandler}
          error={!isConfirmPassValid && isConfirmPassTouched ? 'Required' : null}
        ></MyInputControl>

        <MyButton variant='save' submit disabled={!formIsValid}>
          Signup
        </MyButton>
      </FormContainer>
    </form>
  );
};

export default SignupForm;
