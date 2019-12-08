import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import { listRules } from '../../actions/ruleActions';
import Dashboard from '../Dashboard/Dashboard';
import Rule from '../Rule/Rule';

const ShopifyApp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rules.loading);
  const loaded = useSelector((state) => state.rules.loaded);
  const hasError = useSelector((state) => state.rules.hasError);
  const { path } = useRouteMatch();

  /**
   * Load all rules if needed
   */
  useEffect(() => {
    if (!loaded && !loading && !hasError) {
      dispatch(listRules());
    }
  }, [loaded, loading, hasError, dispatch]);

  return (
    <Switch>
      <Route path={path} exact>
        <Redirect to={`${path}/dashboard`} />
      </Route>
      <Route path={`${path}/dashboard`}>
        <Dashboard />
      </Route>
      <Route path={`${path}/rule/:id`}>
        <Rule />
      </Route>
    </Switch>
  );
};

export default ShopifyApp;
