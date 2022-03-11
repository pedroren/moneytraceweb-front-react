import React, { useState } from 'react';
import MoneyTraceApi from '../../api';
import TransactionItem from './TransactionItem';
import DeleteModal from '../UI/DeleteModal';

const TransactionList = (props) => {
  //props => data
  const [deleteId, setDeleteId] = useState(null);

  const deleteHandler = (id) => {
    setDeleteId(id);
  };
  const deleteRecord = (id) => {
    const api = new MoneyTraceApi();
    api.deleteTransaction(id).then((res) => {
      setDeleteId(null);
      props.onRefresh();
    });
  };
  const deleteCancelHandler = () => {
    setDeleteId(null);
  };

  if (!props.data || props.data.length === 0){
    return <div>No Data Found</div>
  }

  const listSnippet = props.data.map((item) => {
    return (
      <TransactionItem
        data={item}
        key={item._id}
        onDelete={deleteHandler}
      ></TransactionItem>
    );
  });

  return (
    <React.Fragment>
      <ul>{props.data && listSnippet}</ul>
      <DeleteModal
        show={deleteId}
        onAccept={deleteRecord.bind(null, deleteId)}
        onClose={deleteCancelHandler}
      />
    </React.Fragment>
  );
};

export default TransactionList;
