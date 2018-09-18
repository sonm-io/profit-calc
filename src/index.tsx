import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('profit-cacl') as HTMLElement
);
registerServiceWorker();
