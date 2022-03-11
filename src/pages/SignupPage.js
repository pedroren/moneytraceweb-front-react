import React from 'react';
import { useNavigate } from 'react-router-dom';

import MoneyTraceApi from '../api';
import SignupForm from '../components/Auth/SignupForm';
import PageContainer from '../components/UI/PageContainer';

const SignupPage = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    const api = new MoneyTraceApi();
    api.signup(data).then(
      (res) => {
        navigate('/login');
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <PageContainer>
      <h2>Signup</h2>
      <SignupForm onSave={onSubmitHandler}></SignupForm>
    </PageContainer>
  );
};

export default SignupPage;
