import { createTheme } from '@material-ui/core/styles';

// declare module '@material-ui/core/styles/createPalette' {
//   interface Palette {}
//   interface PaletteOptions {}
// }

// declare module '@material-ui/core/styles/createTheme' {
//   interface Theme {}
//   interface ThemeOptions {}
// }

const muiTheme = createTheme({
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
