import {
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
  actionsNode?: React.ReactNode;
};

export default function MuiDialog(props: Props) {
  const classes = useStyles();

  const { title, open, onClose, actionsNode, ...restDialogProps } = props;

  const hasActions = !!actionsNode;

  return (
    <Dialog open={open} onClose={onClose} {...restDialogProps}>
      <DialogTitle className={classes.padding}>
        {title}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={classes.padding}>
        {props.children}
      </DialogContent>

      {hasActions && (
        <DialogActions className={classes.dialogActions}>{props.actionsNode}</DialogActions>
      )}
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  padding: {
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogActions: {
    padding: theme.spacing(2)
  }
}));
