import {
  SET_AUTH_INSTALL_URL,
  SET_AUTH_INSTALL_ERROR,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  SET_AUTH_DATA,
} from '../actions/actionTypes';

const initialState = {
  installUrl: '',
  tokenHash: '',
  tokenShop: '',
  isLoading: false,
  installError: false,
  authError: false,
  isFinished: false,
};

const ruleReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SET_AUTH_INSTALL_URL: {
      const { url } = action;
      return {
        ...state,
        installUrl: url,
        isLoading: false,
        authError: false,
      };
    }
    case SET_AUTH_LOADING: {
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    }
    case SET_AUTH_INSTALL_ERROR: {
      const { hasError } = action;
      return {
        ...state,
        installError: hasError,
        isLoading: false,
      };
    }
    case SET_AUTH_ERROR: {
      const { hasError } = action;
      return {
        ...state,
        authError: hasError,
        isLoading: false,
      };
    }
    case SET_AUTH_DATA: {
      const { tokenHash, tokenShop } = action;
      return {
        ...state,
        tokenHash,
        tokenShop,
        isFinished: true,
      };
    }
    default:
      return state;
  }
};

export default ruleReducer;
