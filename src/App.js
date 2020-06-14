import React from 'react';
import './App.css';
import AppBar from './component/Appbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Export from './component/Export';
import Report from './component/Report';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar />
      <Grid
        container
      // direction="row-reverse"
      // justify="center"
      // alignItems="center"
      >
        <Grid item xs={8}>
          <Report />
        </Grid>
        <Grid item xs={4}>

          <Export />
        </Grid>
      </Grid>
    </div >
  );
}

export default App;
