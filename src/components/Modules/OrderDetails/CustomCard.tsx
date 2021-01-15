import { Card, withStyles } from '@material-ui/core';

const CustomCard = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(Card);

export default CustomCard;
