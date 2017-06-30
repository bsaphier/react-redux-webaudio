const initialState = {
  action: ' - ',
  susResToggle: 'SUSPEND'
};


export default (state = initialState, action) => {

  const nextState = {...state};

  switch (action.type) {
    case 'START':
      nextState.action = 'START';
      break;

    case 'TOGGLE_CTX_RUNNING':
      nextState.susResToggle = nextState.susResToggle === 'SUSPEND'
        ? 'RESUME'
        : 'SUSPEND';
      nextState.action = nextState.susResToggle === 'SUSPEND'
        ? 'RUNNING'
        : 'SUSPENDED';
      break;

    case 'CLOSE':
      nextState.action = 'CLOSE';
      break;

    default:
      break;
  }

  return nextState;

};
