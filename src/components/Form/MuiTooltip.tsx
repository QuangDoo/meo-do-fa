import { Tooltip, withStyles } from '@material-ui/core';

const MuiTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16
  }
}))(Tooltip);

export default MuiTooltip;
