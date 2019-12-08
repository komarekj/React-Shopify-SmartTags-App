import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import DashboardSkeleton from '../Dashboard/DashboardSkeleton';
import AuthError from './AuthError';
import { getInstallUrl, setAuthData } from '../../actions/authActions';


const ShopifyAuth = ({ children }) => {
  const dispatch = useDispatch();

  const installUrl = useSelector((state) => state.auth.installUrl);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isFinished = useSelector((state) => state.auth.isFinished);
  const authError = useSelector((state) => state.auth.authError);
  const tokenShop = useSelector((state) => state.auth.tokenShop);

  const location = useLocation();
  const { shop, newTokenHash } = queryString.parse(location.search);


  // Redirect when we have install URL
  useEffect(() => {
    if (installUrl) {
      window.top.location.href = installUrl;
    }
  }, [installUrl]);


  // New auth finished
  useEffect(() => {
    if (shop && newTokenHash && !isFinished) {
      dispatch(setAuthData(newTokenHash, shop));
    }
  }, [shop, newTokenHash, isFinished, dispatch]);


  // If no auth exists, lets start a new one
  useEffect(() => {
    if (shop && (!isLoading && !isFinished && !newTokenHash && !installUrl && !authError)) {
      dispatch(getInstallUrl(shop));
    }
  }, [shop, isLoading, newTokenHash, isFinished, installUrl, authError, dispatch]);


  // No shop data avaialble, shoulnd't happen in Shopify
  // ...be safe and render error
  if ((!shop && !tokenShop) || authError) {
    return <AuthError />;
  }

  // Auth finished, let's show the app
  if (isFinished) {
    return children;
  }

  // Show loading status
  return <DashboardSkeleton />;
};

ShopifyAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ShopifyAuth;
