import { CREATE, QUEUE_EVENT, CLEAR_EVT_QUEUE } from '../constants';


const INIT_STATE = {
  nodes: {},
  events: []
};


const webAudioReducer = (state = INIT_STATE, action) => {

    const nextState = {
      nodes: state.nodes,
      events: [...state.events]
    };

    switch (action.type) {

      case CREATE:
        nextState.nodes[action.id] =  {
          /* new AudioNode */
          type: action.nodeType
        };
        break;

      case QUEUE_EVENT:
        if (Array.isArray(action.event)) {
          action.event.forEach((event, idx) => {
            nextState.events.push({
              key: (state.events.length + idx),
              event: event
            });
          });
        } else {
          nextState.events.push({
            key: state.events.length,
            event: action.event
          });
        }
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
