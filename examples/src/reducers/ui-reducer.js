const initialState = {
  msg: ' - ',
  susResToggle: 'SUSPEND'
};


export default (state = initialState, action) => {
  const nextState = {...state};

  switch (action.type) {
    
    case 'START':
      nextState.msg = 'BUZZING';
      break;

    case 'TOGGLE_CTX_RUNNING':
      nextState.susResToggle = nextState.susResToggle === 'SUSPEND'
        ? 'RESUME'
        : 'SUSPEND';
      nextState.msg = nextState.susResToggle === 'SUSPEND'
        ? 'BUZZING'
        : 'PAUSED';
      break;

    case 'CLOSE':
      nextState.msg = 'AUDIO CONTEXT CLOSED!';
      break;

    default:
      break;
  }

  return nextState;
};
