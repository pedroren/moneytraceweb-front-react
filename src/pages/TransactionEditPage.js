import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MoneyTraceApi from '../api';
import TransactionForm from '../components/Transactions/TransactionForm';
import PageContainer from '../components/UI/PageContainer';

const TransactionEditPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const onSaveHandler = (record) => {
    const api = new MoneyTraceApi(token);
    api.updateTransaction(record).then(
      (res) => {
        navigate('/transactions');
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <PageContainer>
      <TransactionForm id={params.id} onSave={onSaveHandler}></TransactionForm>
    </PageContainer>
  );
};

export default TransactionEditPage;
