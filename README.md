# REACT-REDUX-WEBAUDIO [![Build Status](https://travis-ci.org/bsaphier/react-redux-webaudio.svg?branch=master)](https://travis-ci.org/bsaphier/react-redux-webaudio) [![Coverage Status](https://coveralls.io/repos/github/bsaphier/react-redux-webaudio/badge.svg?branch=master)](https://coveralls.io/github/bsaphier/react-redux-webaudio) [![npm](https://img.shields.io/npm/v/react-redux-webaudio.svg)](https://www.npmjs.com/package/react-redux-webaudio)
###### An event manager for the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), integrated with [`react-redux`](https://redux.js.org/basics/usagewithreact).

> #### <span style="color:red">***Attn***</span>: *Do not use this library for processing audio events that require low latency.*
> Audio events are handled by React's internal reconciliation/diffing algos and therefore the latency, in terms of audio, is **huge**.

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


### Basic Setup Example
```javascript
/**
 * Imports
 */
// Es6+ import
import { RRWAEngine, actionCreators, webAudioReducer } from 'react-redux-webaudio';
// Es5
const { RRWAEngine, actionCreators, webAudioReducer } = require('react-redux-webaudio');



/**
 * The root reducer used in the Redux store.
 */
const rootReducer = combineReducers({
  // your other reducers...
  webAudioReducer
});



/**
 * The application entry point.
 * Best to keep RRWAEngine at the top-level but technically it can be
 * anywhere, as long as it renders before any AudioEvents are emitted.
 */
ReactDOM.render(
  <Provider store={store}>
    <div>
      <RRWAEngine />
      <App />
    </div>
  </Provider>,
  document.getElementById('app')
);



/**
 * A container component that will render within the component tree of <App />
 */
const Container = connect(
  state => state,
  dispatch => ({ makeNoise: () => dispatch(actionCreators.emit(audioEvent)) })
)(ReactComponent);
```


## Documentation

**React-Redux-Webaudio** consists of three modules:
- **webAudioReducer** – *The Redux reducer.*
- **RRWAEngine** –––––– *The React component.*
- **actionCreators** –––– *The Redux action-creators (it's not required that these action creators are used).*


### Defining an Audio Event
Within the context of **React-Redux-Webaudio**, an `AudioEvent` is a function that receives one or two arguments: a reference to an instance of `window.AudioContext`, anda function that when called, returns that instance's `currentTime` value.

```ts
type AudioEvent = (audioCtx: AudioContext, getCurrentTime?: () => number) => void | any;

// a semi-practical example of what an AudioEvent could look like
let audioEvent: AudioEvent = (audioCtx, getCurrentTime) => {
  let oscillator: OscillatorNode = audioCtx.createOscillator();
  let gainNode: GainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'square';
  oscillator.frequency.value = 100;
  oscillator.start(getCurrentTime() + 500); // wait half a second, then make sound.

  gainNode.gain.value = 0.1;
};
```
###### ***Note***: Directly accessing `audioCtx.currentTime` may result in the time when the event was queued, not invoked. Instead, use the optional function `getCurrentTime`, which will return the value of `audioCtx.currentTime` when the `AudioEvent` is actually invoked.

### Action Creators
#### `emit`
The `emit` action-creator receives a single event or an array of events.
- If passed a single event, it will be pushed to a queue where it will be invoked in FIFO order.
- If passed an array of events, the array will be concatenated with the current event queue.

#### Queueing an audio event without the included `emit` action-creator:
To use your own Redux action instead of the one created by emit, the action type must be `'QUEUE_EVENT'` and the action must have an `event` key with a value of an `AudioEvent` or `Array<AudioEvent>`.

```ts
type AudioEventAction = {
  type: 'QUEUE_EVENT'
  event: AudioEvent | AudioEvent[]
}

let action: AudioEventAction = {
  type: 'QUEUE_EVENT',
  event: (audioCtx, currentTime) => {
    // do something... anything.
  }
};

store.dispatch(action); // more practically, include the action within a mapDispatchToProps function.
```


### The RRWAEngine Component
Include the RRWAEngine component anywhere in your app (*best to keep RRWAEngine at the top-level but technically it can be anywhere*). It must be within scope of the Redux store containing the webAudioReducer.
```js
class App extends React.Component {
  render() {
    return (
      <div>
        <RRWAEngine />
        {/* other components would go here */}
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

###### *Pull Requests, github issues, comments, and questions are welcome* :)
