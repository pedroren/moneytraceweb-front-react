import React, { useEffect, useState } from 'react';
import MyButton from './MyButton';
import styles from './MyModal.module.css';

const MyModal = (props) => {
  //props size => {sm, md, lg}
  //props okButton, okTitle, onOk, disableOk
  const [open, setOpen] = useState(props.open ?? false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const closeHandler = (e) => {
    setOpen(false);
    props.onClose && props.onClose();
  };

  const okHandler = (e) => {
    setOpen(false);
    props.onOk && props.onOk();
  }

  const closeOnEscape = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      closeHandler();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  if (!props.open) {
    return null;
  }
  if (!open) {
    return <React.Fragment></React.Fragment>;
  }
  const okTitle = props.okTitle ?? 'Ok';
  let okSnippet = (props.okButton) && <MyButton onClick={okHandler} variant='save' disabled={props.disableOk}>{okTitle}</MyButton>;

  return (
    <div open={open} onClick={closeHandler} className={styles.container}>
      <div
        className={styles.content + ' rounded'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h4 className={styles.title}>
            <b>{props.title}</b>
          </h4>
        </div>
        <hr />
        <div className={styles.body}>{props.children}</div>
        <hr />
        <div className={styles.footer}>
          <MyButton onClick={closeHandler}>Cancel</MyButton>
          {okSnippet}
        </div>
      </div>
    </div>
  );
};

export default MyModal;
