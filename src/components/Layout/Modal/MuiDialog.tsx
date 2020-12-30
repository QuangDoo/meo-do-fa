import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  makeStyles,
  Theme
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

type ActionButtonProps = {
  label: string;
  onClick: () => void;
};

type Props = DialogProps & {
  title?: string;
  onClose: () => void;
  open: boolean;
  cancelButton?: ActionButtonProps;
  confirmButton?: ActionButtonProps;
};

export default function MuiDialog(props: Props) {
  const classes = useStyles();

  const { title, open, onClose, cancelButton, confirmButton, ...restDialogProps } = props;

  const hasActions = cancelButton || confirmButton;

  return (
    <Dialog open={open} onClose={onClose} {...restDialogProps}>
      <DialogTitle className={classes.padding2}>
        {title}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={classes.padding2}>
        {props.children}
      </DialogContent>

      {hasActions && (
        <DialogActions>
          {cancelButton && (
            <Button type="button" color="primary" onClick={cancelButton.onClick}>
              {cancelButton.label}
            </Button>
          )}

          {confirmButton && (
            <Button type="button" color="primary" onClick={confirmButton.onClick}>
              {confirmButton.label}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  padding2: {
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));
