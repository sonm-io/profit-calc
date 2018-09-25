import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/app';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6522ff'
    }
  },
  props: {
    MuiButton: {
      disableTouchRipple: true,
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('profit-calc') as HTMLElement
);
