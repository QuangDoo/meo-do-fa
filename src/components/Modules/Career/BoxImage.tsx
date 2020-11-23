import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

interface Image {
  imgUrl?: string;
  title?: string;
  alt?: string;
  col?: number;
}

type Props = {
  images?: Image[];
};

export default function BoxImage(props: Props): JSX.Element {
  const classes = useStyles();
  const { images } = props;

  return (
    <section className="box-image">
      <div className="container mb-3">
        <h3 className="text-center about-us__title">Life At Medofa</h3>
      </div>
      <div className={classes.root}>
        <Grid container>
          {images.map((image) => (
            <Grid xs={6} sm={4} md={3} lg={3} item key={image?.imgUrl}>
              <Paper>
                <img src={image?.imgUrl} alt={image.title} style={{ width: '100%' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}
