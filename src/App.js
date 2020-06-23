import React, { useReducer } from 'react';
import './App.css';
import AppBar from './component/Appbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Export from './component/Export';
import Report from './component/Report';
import imageContext from './context/image-context';

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

const exportGraph = {
  graph: '',
  ExcelGraph: []
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_GRAPH":
      return {
        ...state,
        graph: action.graph
      }
    case "UPDATE_EXCELGRAPH":
      return {
        ...state,
        ExcelGraph: action.ExcelGraph
      }
    default:
      return state;
  }
}

function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, exportGraph);

  return (
    <imageContext.Provider value={{ state, dispatch}} className={classes.root}>
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
    </imageContext.Provider >
  );
}

export default App;
