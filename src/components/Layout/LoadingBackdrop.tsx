import { Backdrop, CircularProgress, Fade, makeStyles, Modal } from '@material-ui/core';
import React from 'react';

type Props = {
  open: boolean;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    color: theme.palette.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const LoadingBackdrop = (props: Props) => {
  const classes = useStyles();

  return (
    <Modal
      open={props.open}
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 250
      }}>
      <Fade in={props.open}>
        <CircularProgress color="inherit" />
      </Fade>
    </Modal>
  );
};

export default LoadingBackdrop;
