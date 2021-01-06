import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

type Props = {
  open: boolean;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const LoadingBackdrop = (props: Props) => {
  const classes = useStyles();

  return (
    <Backdrop
      classes={{
        root: classes.backdrop
      }}
      open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
