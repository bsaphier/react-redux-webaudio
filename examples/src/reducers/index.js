import { combineReducers } from 'redux';

import webAudioReducer     from '../../rrwa/reducers';
import uiReducer          from './ui-reducer';


export default combineReducers({
  webAudioReducer,
  uiReducer
});
