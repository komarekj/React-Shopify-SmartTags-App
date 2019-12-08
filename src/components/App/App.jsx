import React from 'react';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ShopifyApp from '../Shopify/ShopifyApp';
import InstallForm from '../Shopify/InstallForm';
import ShopifyAuth from '../Shopify/ShopifyAuth';
import Home from './Home';
import theme from './theme';

import '@shopify/polaris/styles.css';

const App = () => (
  <AppProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/install">
            <InstallForm />
          </Route>
          <Route path="/app">
            <ShopifyAuth>
              <ShopifyApp />
            </ShopifyAuth>
          </Route>
        </Switch>
      </Router>
    </Provider>
  </AppProvider>
);

export default App;
