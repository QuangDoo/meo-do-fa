import { createMuiTheme } from '@material-ui/core';
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    white: '#fff',
    'gray-100': '#f8f9fa',
    'gray-200': '#e9ecef',
    'gray-300': '#dee2e6',
    'gray-400': '#ced4da',
    'gray-500': '#adb5bd',
    'gray-600': '#6c757d',
    'gray-700': '#495057',
    'gray-800': '#343a40',
    'gray-900': '#212529',
    black: '#000',
    black1: '#23201f',

    blue: '#2f3b97',
    blue1: '#08479c',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#e83e8c',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffcb31',
    green: '#28a745',
    teal: '#20c997',
    cyan: '#17a2b8',

    primary: '#2f3b97',

    secondary: '#ffcb31',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffcb31',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40'
  }
};

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.colors.primary
    },
    secondary: {
      main: theme.colors.secondary
    },
    error: {
      main: theme.colors.danger
    }
  }
});

export { theme, muiTheme };
