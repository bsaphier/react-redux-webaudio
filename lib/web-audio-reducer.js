import { QUEUE_EVENT, CLEAR_EVT_QUEUE } from './constants';
/** @constant */

const INIT_STATE = {
  events: []
};

const webAudioReducer = (state = INIT_STATE, action) => {
  const nextState = {
    events: [...state.events]
  };

  switch (action.type) {
    case QUEUE_EVENT:
      queueEvent(state, action, nextState);
      break;

    case CLEAR_EVT_QUEUE:
      nextState.events = [];
      break;

    default:
      break;
  }

  return nextState;
};

export default webAudioReducer;

function queueEvent(state, action, nextState) {
  if (Array.isArray(action.event)) {
    action.event.forEach((event, idx) => {
      nextState.events.push({
        key: state.events.length + idx,
        event: event
      });
    });
  } else {
    nextState.events.push({
      key: state.events.length,
      event: action.event
    });
  }
}