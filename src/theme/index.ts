import { createMuiTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    white: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    white: React.CSSProperties['color'];
  }
}

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
