import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import ruleReducer from '../reducers/ruleReducer';
import authReducer from '../reducers/authReducer';


/**
 * Reducers
 */
const reducers = combineReducers({
  rules: ruleReducer,
  auth: authReducer,
});


/**
 * Middlewares
 */
const middlewares = [
  thunkMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}


/**
 * Store
 */
const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

export default store;
