import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MoneyTraceApi from '../api';
import AccountForm from '../components/Basics/AccountForm';
import AccountList from '../components/Basics/AccountList';
import DeleteModal from '../components/UI/DeleteModal';
import MyButton from '../components/UI/MyButton';
import MySnackbar from '../components/UI/MySnackbar';
import useGlobals from '../hooks/use-globals';

const AccountPage = (props) => {
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
      api.createAccount(record).then((res) => {
        closeModalHandler();
        setMessage('Record saved successfully');
        globals.refreshAccounts();
      });
    } else {
      //Edit-update
      api.updateAccount(record).then((res) => {
        closeModalHandler();
        setMessage('Record saved successfully');
        globals.refreshAccounts();
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
    api.deleteAccount(id).then((res) => {
      setDeleteId(null);
      setMessage('Record deleted successfully');
      globals.refreshAccounts();
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
      <AccountList
        onEdit={editHandler}
        onDelete={deleteHandler}
      ></AccountList>
      <AccountForm
        onSave={saveHandler}
        id={editId}
        open={modalOpen}
        onClose={closeModalHandler}
      ></AccountForm>
      <DeleteModal
        show={deleteId}
        onAccept={deleteRecord.bind(null, deleteId)}
        onClose={deleteCancelHandler}
      />
      {message && <MySnackbar severity='success' message={message} />}
    </React.Fragment>
  );
};

export default AccountPage;
