import api from '../services/api';
import {
  LIST_RULES,
  SET_LOADING_STATUS,
  SET_LOADED_ERROR,
  CREATE_RULE,
  UPDATE_RULE,
  REMOVE_RULE,
} from './actionTypes';


/**
 * Sync Actions
 */
const updateList = (items, count) => (
  { type: LIST_RULES, items, count }
);

const setLoadingStatus = (loading) => (
  { type: SET_LOADING_STATUS, loading }
);

const setLoadedError = (hasError) => (
  { type: SET_LOADED_ERROR, hasError }
);

const create = (newRule) => (
  { type: CREATE_RULE, newRule }
);

const update = (updatedRule) => (
  { type: UPDATE_RULE, updatedRule }
);

const remove = (_id) => (
  { type: REMOVE_RULE, _id }
);


/**
 * Helpers
 */
const getTokenHash = (getState) => {
  const { auth } = getState();
  return auth.tokenHash;
};


/**
 * Async Actions
 */
const listRules = (page = 1) => (
  (dispatch, getState) => {
    const tokenHash = getTokenHash(getState);

    dispatch(setLoadingStatus(true));
    api.list(page, tokenHash).then((data) => {
      const { items, count } = data;
      dispatch(updateList(items, count));
    }).catch((err) => {
      dispatch(setLoadedError(true));
      dispatch(setLoadingStatus(false));
    });
  }
);

const removeRule = (_id) => (
  (dispatch, getState) => {
    const tokenHash = getTokenHash(getState);
    dispatch(setLoadingStatus(true));
    api.remove(_id, tokenHash).then(() => {
      dispatch(remove(_id));
    }).catch((err) => {
      dispatch(setLoadedError(true));
      dispatch(setLoadingStatus(false));
    });
  }
);

const createRule = (data) => (
  (dispatch, getState) => {
    const tokenHash = getTokenHash(getState);

    dispatch(setLoadingStatus(true));
    api.create(data, tokenHash).then((rule) => {
      dispatch(create(rule));
    }).catch((err) => {
      dispatch(setLoadingStatus(false));
      dispatch(setLoadedError(true));
    });
  }
);

const updateRule = (_id, data) => (
  (dispatch, getState) => {
    const tokenHash = getTokenHash(getState);

    dispatch(setLoadingStatus(true));
    api.update(_id, data, tokenHash).then((rule) => {
      dispatch(update(rule));
    }).catch((err) => {
      dispatch(setLoadingStatus(false));
      dispatch(setLoadedError(true));
    });
  }
);


export {
  listRules,
  removeRule,
  createRule,
  updateRule,
};
