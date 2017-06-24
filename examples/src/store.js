import { createStore, combineReducers } from 'redux';


const initialState = {
  hello: 'WORLD'
};

const sampleReducer = (state = initialState, action) => {
  const nextState = {...state};
  switch (action.type) {
    default:
      break;
  }
  return nextState;
};

const rootReducer = combineReducers( sampleReducer );

export default createStore( rootReducer );
