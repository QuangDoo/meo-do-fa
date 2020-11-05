import { ToastContainer as DefaultToastContainer } from 'react-toastify';
import styled from 'styled-components';

// HOW TO STYLE:
//   https://fkhadra.github.io/react-toastify/how-to-style/

const ToastContainer = styled(DefaultToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
  }

  .Toastify__toast {
  }

  .Toastify__toast--error {
  }

  .Toastify__toast--warning {
  }

  .Toastify__toast--success {
  }

  .Toastify__toast-body {
  }

  .Toastify__progress-bar {
  }
`;

export default ToastContainer;
