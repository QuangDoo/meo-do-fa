import { DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC } from 'react';
import ModalBase, { ModalBaseProps } from 'src/components/Layout/Modal/ModalBase';

type Props = ModalBaseProps & {
  // Modal title
  title: string;

  // Additional classname for modal content container
  className?: string;
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

const ModalWithHeader: FC<Props> = (props) => {
  const { children, open, onClose, title, className, onBackdropClick } = props;

  const classes = useStyles();

  return (
    <ModalBase open={open} onClose={onClose} onBackdropClick={onBackdropClick}>
      <DialogTitle
        disableTypography
        classes={{
          root: classes.titleRoot
        }}>
        <Typography variant="h6">{title}</Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose} size="small">
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
