import { DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import ModalBase, { ModalBaseProps } from 'src/components/Layout/Modal/ModalBase';

type Props = ModalBaseProps & {
  // Modal title
  title: string;

  // Additional classname for modal content container
  className?: string;

  onClose: () => void;
};

const useStyles = makeStyles((theme) => ({
  titleRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  contentRoot: {
    padding: theme.spacing(2)
  }
}));

const ModalWithHeader = (props: Props) => {
  const { children, title, className, onClose } = props;

  const classes = useStyles();

  return (
    <ModalBase {...props}>
      <DialogTitle
        disableTypography
        classes={{
          root: classes.titleRoot
        }}>
        <Typography variant="h6">{title}</Typography>
        {onClose ? (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      <DialogContent
        dividers
        classes={{
          root: classes.contentRoot
        }}>
        <div className={className}>{children}</div>
      </DialogContent>
    </ModalBase>
  );
};

export default ModalWithHeader;
