import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MoneyTraceApi from '../api';
import TransactionForm from '../components/Transactions/TransactionForm';
import PageContainer from '../components/UI/PageContainer';
import useGlobals from '../hooks/use-globals';

const TransactionNewPage = (props) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const globals = useGlobals();

  const onSaveHandler = (record) => {
    const api = new MoneyTraceApi(token);
    api.createTransaction(record).then(
      (res) => {
        globals.showMessage('Transaction created');
        navigate('/transactions');
      },
      (err) => {
        console.log(err);
        globals.showError(err);
      }
    );
  };

  return (
    <PageContainer>
      <TransactionForm onSave={onSaveHandler}></TransactionForm>
    </PageContainer>
  );
};

export default TransactionNewPage;
