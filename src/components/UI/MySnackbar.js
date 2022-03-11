import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MySnackbar = props => {
  //props severity -> {"success", "error", "warning", "info"}
  //props message

  const [open, setOpen] = React.useState(false);
  const vertical = props.severity === 'error' ? 'top' : 'bottom';
  const horizontal = props.severity === 'error' ? 'center' : 'left';

  React.useEffect(() => {
    if (props.message) {
      setOpen(true);
    }
    else {
      setOpen(false);
    }
  }, [props.message])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default MySnackbar;