// Material UI custom colors:
// https://material-ui.com/customization/palette/#adding-new-colors

// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {}
//   interface ThemeOptions {}
// }

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    white: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    white: React.CSSProperties['color'];
  }
}
