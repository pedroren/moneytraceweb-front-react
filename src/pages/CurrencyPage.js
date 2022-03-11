import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MoneyTraceApi from '../api';
import DeleteModal from '../components/UI/DeleteModal';
import MyButton from '../components/UI/MyButton';
import MySnackbar from '../components/UI/MySnackbar';
import useGlobals from '../hooks/use-globals';

import CurrencyForm from '../components/Basics/CurrencyForm';
import CurrencyList from '../components/Basics/CurrencyList';

const CurrencyPage = (props) => {
  const token = useSelector((state) => state.auth.token);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState(null);
  const globals = useGlobals();

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

  const newHandler = () => {
    if (editId) {
      setEditId(null);
    }
    setModalOpen(true);
  };
  const editHandler = (id) => {
    setEditId(id);
    setModalOpen(true);
  };
  const saveHandler = (record) => {
    const api = new MoneyTraceApi(token);
    if (!record._id) {
      //New-Create
      api.createCurrency(record).then((res) => {
        closeModalHandler();
        setMessage('Record saved successfully');
        globals.refreshCurrencies();
      });
    } else {
      //Edit-update
      api.updateCurrency(record).then((res) => {
        closeModalHandler();
        setMessage('Record saved successfully');
        globals.refreshCurrencies();
      });
    }
  };
  const deleteHandler = (id) => {
    console.log('request delete ', id);
    setDeleteId(id);
  };
  const deleteRecord = (id) => {
    console.log('deleting ', id);
    const api = new MoneyTraceApi(token);
    api.deleteCurrency(id).then((res) => {
      setDeleteId(null);
      setMessage('Record deleted successfully');
      globals.refreshCurrencies();
    });
  };
  const deleteCancelHandler = () => {
    setDeleteId(null);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <MyButton action='new' onClick={newHandler}>
        New
      </MyButton>
      <CurrencyList
        onEdit={editHandler}
        onDelete={deleteHandler}
      ></CurrencyList>
      <CurrencyForm
        onSave={saveHandler}
        id={editId}
        open={modalOpen}
        onClose={closeModalHandler}
      ></CurrencyForm>
      <DeleteModal
        show={deleteId}
        onAccept={deleteRecord.bind(null, deleteId)}
        onClose={deleteCancelHandler}
      />
      {message && <MySnackbar severity='success' message={message} />}
    </React.Fragment>
  );
};

export default CurrencyPage;
