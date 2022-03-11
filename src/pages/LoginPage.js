import React from 'react';
import { useNavigate } from 'react-router-dom';

import MoneyTraceApi from '../api';
import LoginForm from '../components/Auth/LoginForm';
import MyButton from '../components/UI/MyButton';
import PageContainer from '../components/UI/PageContainer';
import useGlobals from '../hooks/use-globals';

const LoginPage = () => {
  const navigate = useNavigate();
  const {setStoredLogin} = useGlobals();

  const onSubmitHandler = (data) => {
    const api = new MoneyTraceApi();
    api.login(data).then(
      (res) => {
        console.log('login',res)
        setStoredLogin(res.token)
        navigate('/');
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <PageContainer>
      <h2>Login</h2>
      <LoginForm onSave={onSubmitHandler}></LoginForm>
      <MyButton linkto='/signup'>Signup</MyButton>
    </PageContainer>
  );
};

export default LoginPage;
