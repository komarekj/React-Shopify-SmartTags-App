import api from '../services/api';
import {
  SET_AUTH_INSTALL_URL,
  SET_AUTH_INSTALL_ERROR,
  SET_AUTH_LOADING,
  SET_AUTH_CURRENT_SHOP,
  SET_AUTH_DATA,
} from './actionTypes';


/**
 * Sync Actions
 */
const setLoading = (isLoading) => (
  { type: SET_AUTH_LOADING, isLoading }
);

const setUrl = (url) => (
  { type: SET_AUTH_INSTALL_URL, url }
);

const setInstallError = (hasError) => (
  { type: SET_AUTH_INSTALL_ERROR, hasError }
);

const setCurrentShop = (currentShop) => (
  { type: SET_AUTH_CURRENT_SHOP, currentShop }
);

const setAuthData = (tokenHash, tokenShop) => (
  { type: SET_AUTH_DATA, tokenHash, tokenShop }
);


/**
 * Async Actions
 */
const getInstallUrl = (shopUrl) => (
  (dispatch) => {
    dispatch(setLoading(true));
    api.getInstallUrl(shopUrl).then(({ url }) => {
      dispatch(setUrl(url));
    }).catch((err) => {
      dispatch(setInstallError(true));
      dispatch(setLoading(false));
    });
  }
);


export {
  setCurrentShop,
  setAuthData,
  getInstallUrl,
};
