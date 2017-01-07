import { combineReducers } from 'redux';

import nodeReducer from './node-reducer';
import contextReducer from './context-reducer';

export default combineReducers(
  nodeReducer,
  contextReducer
);
