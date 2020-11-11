// import original module declarations
import 'styled-components';

type Colors =
  | 'white'
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'gray-600'
  | 'gray-700'
  | 'gray-800'
  | 'gray-900'
  | 'black'
  | 'black1'
  | 'blue'
  | 'blue1'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [color in Colors]: string;
    };
  }
}
