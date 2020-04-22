import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

import './assets/styles/app.scss';

import configureStore from './state/configureStore';
import Layout from './views/layout/Layout.view';

export const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <BreadcrumbsProvider>
        <Layout />
      </BreadcrumbsProvider>
    </Router>
  </Provider>
);

export default App;
