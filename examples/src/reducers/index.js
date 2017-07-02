import { combineReducers } from 'redux';

import { webAudioReducer } from '../../../../react-redux-webaudio';
import uiReducer           from './ui-reducer';


export default combineReducers({
  webAudioReducer,
  uiReducer
});
