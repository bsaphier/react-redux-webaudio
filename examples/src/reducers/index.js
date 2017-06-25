import { combineReducers } from 'redux';

import { audioContextProvider as webAudioReducer } from '../../../src';


const initialState = {
  hello: 'WORLD'
};

const helloWorld = (state = initialState, action) => {
  const nextState = {...state};
  switch (action.type) {
    default:
      break;
  }
  return nextState;
};

export default combineReducers({
  webAudioReducer,
  helloWorld
});
