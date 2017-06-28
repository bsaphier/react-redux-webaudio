const initialState = {
  action: ' - '
};


export default (state = initialState, action) => {

  const nextState = {...state};

  switch (action.type) {
    case 'PLAY':
      nextState.action = 'PLAY';
      break;

    case 'PAUSE':
      nextState.action = 'PAUSE';
      break;

    default:
      break;
  }

  return nextState;

};
