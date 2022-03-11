import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useGlobals from '../../hooks/use-globals';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyMessage = (props) => {
  const globals = useGlobals();
  const message = useSelector((state) => state.ui.message);
  const severity = message ? 'success' : 'error';

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    //setOpen(false);
    if (message) {
      globals.clearMessage();
    }
  };

  useEffect(() => {
    if (message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
    {message}
  </Alert>
      </Snackbar>
  );
};

export default MyMessage;
