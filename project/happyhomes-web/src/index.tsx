import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import reportWebVitals from './reportWebVitals';
import Router from './Router';

import './init';

import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={{}} locale="en" defaultLocale="en">
      <Router />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
