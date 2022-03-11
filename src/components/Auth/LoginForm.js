import useInputValidator from "../../hooks/use-input-val";
import FormContainer from "../UI/FormContainer";
import MyButton from "../UI/MyButton";
import MyInputControl from "../UI/MyInputControl";

const LoginForm = props => {
  const {
    value: emailValue,
    isValid: isEmailValid,
    isTouched: isEmailTouched,
    onChangeHandler: emailChangeHandler,
  } = useInputValidator();
  const {
    value: passwordValue,
    isValid: isPasswordValid,
    isTouched: isPasswordTouched,
    onChangeHandler: passwordChangeHandler,
  } = useInputValidator();

  
  const formIsValid = isEmailValid && isPasswordValid;

  const submitHandler = (event) => {
    event.preventDefault();
    if(!formIsValid){
      return;
    }
    let record = {email: emailValue, password: passwordValue};
    props.onSave(record);
  };

  return (
    <form onSubmit={submitHandler} className='flex flex-col'>
      <FormContainer size='md'>
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

        <MyButton variant='save' submit disabled={!formIsValid}>
          Login
        </MyButton>
      </FormContainer>
    </form>
  );
}

export default LoginForm;