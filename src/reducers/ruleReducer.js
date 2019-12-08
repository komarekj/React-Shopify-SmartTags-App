/* eslint-disable no-underscore-dangle */
import {
  LIST_RULES,
  SET_LOADING_STATUS,
  SET_LOADED_STATUS,
  SET_LOADED_ERROR,
  CREATE_RULE,
  UPDATE_RULE,
  REMOVE_RULE,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  count: [],
  loading: false,
  loadeed: false,
  hasError: false,
};

const ruleReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case LIST_RULES: {
      const { items, count } = action;
      return {
        ...state,
        items,
        count,
        hasError: false,
        loaded: true,
        loading: false,
      };
    }
    case SET_LOADING_STATUS: {
      const { loading } = action;
      return {
        ...state,
        loading,
      };
    }
    case SET_LOADED_STATUS: {
      const { loaded } = action;
      return {
        ...state,
        loaded,
      };
    }
    case SET_LOADED_ERROR: {
      const { hasError } = action;
      return {
        ...state,
        hasError,
      };
    }
    case REMOVE_RULE: {
      const { _id } = action;
      return {
        ...state,
        items: state.items.filter((item) => item._id !== _id),
        hasError: false,
        loading: false,
      };
    }
    case CREATE_RULE: {
      const { newRule } = action;
      return {
        ...state,
        items: [...state.items, newRule],
        hasError: false,
        loading: false,
      };
    }
    case UPDATE_RULE: {
      const { updatedRule } = action;
      const ruleIndex = state.items.findIndex((item) => item._id === updatedRule._id);
      const newRules = [...state.items];
      newRules[ruleIndex] = updatedRule;
      return {
        ...state,
        items: newRules,
        hasError: false,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default ruleReducer;
