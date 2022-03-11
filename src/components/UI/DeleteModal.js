import { useEffect, useState } from 'react';
import MyButton from './MyButton';
import MyModal from './MyModal';

const DeleteModal = (props) => {
  //props -> show
  //props -> onAccept
  //props -> onClose
  const [modalOpen, setModalOpen] = useState(false);

  const closeModalHandler = () => {
    setModalOpen(false);
    props.onClose && props.onClose();
  };
  const acceptHandler = () => {
    setModalOpen(false);
    props.onAccept && props.onAccept();
  };

  useEffect(() => {
    if (props.show) {
      setModalOpen(true);
    }
  }, [props.show]);

  return (
    <MyModal open={modalOpen} onClose={closeModalHandler} title='Delete Confirmation'>
      <p>Are you sure you want to delete this record?</p>
      <div>
        <MyButton variant='delete' onClick={acceptHandler}>
          Yes
        </MyButton>
      </div>
    </MyModal>
  );
};

export default DeleteModal;
