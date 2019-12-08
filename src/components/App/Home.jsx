import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Home = () => {
  const location = useLocation();
  const { shop } = queryString.parse(location.search);

  return shop ? (
    <Redirect to={{ pathname: '/app', search: location.search }} />
  ) : (
    <Redirect to="/install" />
  );
};

export default Home;
