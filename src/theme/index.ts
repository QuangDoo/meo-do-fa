import { createMuiTheme } from '@material-ui/core';

// declare module '@material-ui/core/styles/createPalette' {
//   interface Palette {}
//   interface PaletteOptions {}
// }

// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {}
//   interface ThemeOptions {}
// }

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: "'UTM AVO', Arial, Helvetica, sans-serif"
  },
  palette: {
    primary: {
      main: '#2f3b97'
    },
    secondary: {
      main: '#ffcb31'
    },
    grey: {
      '500': '#adb5bd'
    }
  }
});

export { muiTheme };
