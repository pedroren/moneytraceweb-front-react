import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CategoryForm from '../components/Basics/CategoryForm';
import CategoryList from '../components/Basics/CategoryList';
import MyButton from '../components/UI/MyButton';
import MoneyTraceApi from '../api/index';
import useGlobals from '../hooks/use-globals';
import DeleteModal from '../components/UI/DeleteModal';
import MySnackbar from '../components/UI/MySnackbar';

const CategoryPage = (props) => {
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
      api.createCategory(record).then((res) => {
        closeModalHandler();
        setMessage('Record saved successfully');
        globals.refreshCategories();
      });
    } else {
      //Edit-update
      api.updateCategory(record).then((res) => {
        closeModalHandler();
        setMessage('Record saved successfully');
        globals.refreshCategories();
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
    api.deleteCategory(id).then((res) => {
      setMessage('Record deleted successfully');
      setDeleteId(null);
      globals.refreshCategories();
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
      <CategoryList
        onEdit={editHandler}
        onDelete={deleteHandler}
      ></CategoryList>
      <CategoryForm
        onSave={saveHandler}
        id={editId}
        open={modalOpen}
        onClose={closeModalHandler}
      ></CategoryForm>
      <DeleteModal
        show={deleteId}
        onAccept={deleteRecord.bind(null, deleteId)}
        onClose={deleteCancelHandler}
      />
      {message && <MySnackbar severity='success' message={message} />}
    </React.Fragment>
  );
};

export default CategoryPage;
