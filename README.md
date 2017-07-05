# **REACT-REDUX-WEBAUDIO**
###### The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.
This package was heavily inspired by [this article](http://joesul.li/van/react-and-web-audio/).

[DEMO](https://bsaphier.github.io/react-redux-webaudio/examples/index.html)

### **Installation:**
```bash
npm i react-redux-webaudio
```

---

#### Basic Setup
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
)(ReactComponent);
```
---


## **Documentation**
###### \*\* _still in progress_ \*\*


**React-Redux-Webaudio** consists of three modules:
- **webAudioReducer** – *The reducer.*
- **RRWAEngine** –––––– *The React component.*
- **actionCreators**\* ––– *The module containing Redux action-creators.*
######  \* It is not required that you use the actions provided from actionCreators.


### The Redux Part:

##### Audio-Event: **(audioCtx: window.AudioContext, currentTime: number) => any**
In the context of **React-Redux-Webaudio**, an "*audio-event*" is a function that receives a reference to an instance of the window.AudioContext as well as the the *currentTime* value of that instance.

```javascript
// a semi-practical example of what an "audio-event" callback could look like
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

##### Emit: **action-creator**
The emit action-creator receives an array of *audio-events* or a single *audio-event* callback function.
- If passed a single callback, the callback will be pushed on to a queue of *audio-events* where it will be called in FIFO order.
- If emit is passed an array, the array will be concatenated with the current queue of *audio-events*.

##### Queue an *audio-event*: **action**
###### (without the **emit** action-creator)
To use your own action instead of the one created by emit, the type constant must be 'QUEUE_EVENT' and it must have an event key, whose value may be a callback function (*audio-event*) or an array (of *audio-events*).

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

---

### The React Part:
##### RRWAEngine: React component
Include the RRWAEngine component anywhere in your app. The only requirement is that it must be within scope of the Redux store containing the webAudioReducer. Placing this component in the top level of your app makes sense in most scenarios.

---


###### *Comments, questions, github issues, and Pull Requests are welcome* :)
