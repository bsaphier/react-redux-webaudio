# REACT-REDUX-WEBAUDIO
[![Build Status](https://travis-ci.org/bsaphier/react-redux-webaudio.svg)](https://travis-ci.org/bsaphier/react-redux-webaudio) [![Coverage Status](https://coveralls.io/repos/github/bsaphier/react-redux-webaudio/badge.svg)](https://coveralls.io/github/bsaphier/react-redux-webaudio) [![npm](https://img.shields.io/npm/v/react-redux-webaudio.svg)](https://www.npmjs.com/package/react-redux-webaudio)
###### The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.

## Demo & Examples
[Live Demo](https://bsaphier.github.io/react-redux-webaudio/examples/public/index.html)
To build the examples locally, clone/fork the repo and run:
```
cd examples
yarn /* OR */ npm install
npm start   // this will start a webpack-dev-server and open the demo in your browser
```

## Installation & Setup
```bash
npm i react-redux-webaudio
```


### Basic Setup
```javascript
import { RRWAEngine, actionCreators, webAudioReducer } from 'react-redux-webaudio';
...


const rootReducer = combineReducers({
  ...
  webAudioReducer
});

const store = createStore( rootReducer );


ReactDOM.render(
  <Provider store={ store }>
    <RRWAEngine />
    <App />
  </Provider>,
  document.getElementById('app')
);


...


// wire up a container component used somewhere inside <App />
const Container = connect(
  state => state,
  dispatch => ({
    makeNoise: () => dispatch( actionCreators.emit( audioEvent ) );
  })
)(ReactComponent);M
```


## Documentation

**React-Redux-Webaudio** consists of three modules:
- **webAudioReducer** – *The reducer.*
- **RRWAEngine** –––––– *The React component.*
- **actionCreators**\* ––– *The module containing Redux action-creators.*

\* *It is not required that you use the actions provided from actionCreators.*


### The Redux Part

**Audio Event:** [ (audioCtx: window.AudioContext, currentTime: number) => any ]

In the context of **React-Redux-Webaudio**, an "audio event" is a function that receives a reference to an instance of the window.AudioContext as well as that instance's *currentTime* value.

```javascript
// a semi-practical example of what an "audio event" callback could look like
let audioEvent = ( audioContext, currentTime ) => {

  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.value = 100;
  oscillator.start(currentTime + 500); // wait half a second, then make sound.

  gainNode.gain.value = 0.1;

};
```

**Emit:** *action-creator*

The emit action-creator receives a single (*audio*) event or an array of events.
- If passed a single callback, the callback will be pushed on to a queue where it will be called in FIFO order.
- If passed an array, the array will be concatenated with the current event queue.
- When the event is called, it will be treated as an audio event.

#### Queue an audio event without the **emit** action-creator:
To use your own Redux action instead of the one created by emit, the type constant must be 'QUEUE_EVENT' and it must have an event key whose value is an audio event or an array of audio events.

```javascript
const QUEUE_EVENT = 'QUEUE_EVENT';

let audioEvent = ( audioContext, currentTime) => {
  // do something.... anything.
};

let action = {
  type: QUEUE_EVENT,
  event: audioEvent
};

// update the audio-event queue in a store containing the webAudioReducer
store.dispatch( action ); // more practically, include the action inside react-redux's connect()
```

### The React Part
**RRWAEngine:** *component*

Include the RRWAEngine component anywhere in your app. The only requirement is that it must be within scope of the Redux store containing the webAudioReducer.
```javascript
class App extends React.Component {
  render() {
    return (
      <div>
        <RRWAEngine />
        ...
        /* your other App components */
        ...
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
```

---

###### *Pull Requests, github issues, and comments/questions are welcome* :)
