import { createMuiTheme } from '@material-ui/core';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f3b97'
    },
    secondary: {
      main: '#ffcb31'
    },
    grey: {
      '500': '#adb5bd'
    },
    white: '#fff'
  }
});

export { muiTheme };
