import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MoneyTraceApi from '../api';
import TransactionList from '../components/Transactions/TransactionList';
import TransFilterForm from '../components/Transactions/TransFilterForm';
import LoadingSpin from '../components/UI/LoadingSpin';
import MyButton from '../components/UI/MyButton';
import PageContainer from '../components/UI/PageContainer';
import MySnackbar from '../components/UI/MySnackbar';

const TransactionPage = () => {
  const token = useSelector((state) => state.auth.token);

  const [transList, setTransList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [transFilter, setTransFilter] = useState({
    accountId: null,
    categoryId: null,
  });

  const refreshHandler = () => {
    new MoneyTraceApi(token)
      .getTransactionsFiltered(transFilter.accountId, transFilter.categoryId)
      .then(
        (res) => {
          try {
            setTransList(res.data ?? []);
          } catch (e) {
            console.log('catch', e);
            setError(e.message);
            setTransList([]);
          }
          setLoading(false);
        },
        (err) => {
          console.log('err', err);
          setError(err.message);
          setTransList([]);
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  useEffect(() => {
    refreshHandler();
  }, [transFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) {
        setError(null);
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  useEffect(() => {
    const timermsg = setTimeout(() => {
      if (message) {
        setMessage(null);
      }
    }, 5000);
    return () => {
      clearTimeout(timermsg);
    };
  }, [message]);

  const onFilterHandler = (filter) => {
    console.log('filter', filter);
    setTransFilter(filter);
  };

  if (loading) {
    return <LoadingSpin />;
  }

  return (
    <React.Fragment>
      <PageContainer>
        <TransFilterForm onChange={onFilterHandler}></TransFilterForm>
        <MyButton variant='action' linkto={'/transaction/new'}>
          New
        </MyButton>
        <TransactionList
          data={transList}
          onRefresh={refreshHandler}
        ></TransactionList>
      </PageContainer>
      {error && <MySnackbar severity='error' message={error} />}
      {message && <MySnackbar severity='success' message={message} />}
    </React.Fragment>
  );
};

export default TransactionPage;
