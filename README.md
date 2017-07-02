# **REACT-REDUX-WEBAUDIO**
###### The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.


### **Installation:**
```bash
npm i react-redux-webaudio
```

---

### **Documentation**
###### \*\* _still in progress_ \*\*

##### There are two main parts to **React-Redux-Webaudio**: the Redux reducer and the React component.


The package consists of three modules:
  - **webAudioReducer** – *The reducer.*
  - **RRWAEngine** –––––– *The React component.*
  - **actions**\* ––––––––––– *The module containing Redux action-creators.*

  \* It is not required that you use the actions provided.


##### The Redux Part:
###### **Action-Creator**: emit

  The emit action receives an array of "*audio-events*" or a single "*audio-event*" callback function.
- If passed a callback, the callback will be pushed on to a queue of "*audio-events*".
- If emit is passed an array, the array will be concatenated with the current queue of "*audio-events*".

###### Queueing an "*audio-event*" without the **emit** action-creator:
To use your own action, instead of the provided emit action, the type constant must be 'QUEUE_EVENT' and it must have an event key, whose value may be a callback function ("*audio-event*") or an array (of "*audio-events*").

###### **Action**: queue an "*audio-event*"

```javascript
const QUEUE_EVENT = 'QUEUE_EVENT';

let audioEvent = ( audioContext, currentTime) => {
  // do something.... anything.
};

let action = {
  type: QUEUE_EVENT,
  event: audioEvent
};

// more practically, include the action inside react-redux's connect()
store.dispatch( action ); // update the audio-event queue
```

---

#### Setup
```javascript
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
```

Each "*audio-event*" receives a reference to an instance of the window.AudioContext as well as the the *currentTime* value of that instance.

```javascript
// a semi-practical example of what an "audio-event" could be
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


const Container = connect(
  state => state,
  dispatch => ({
    makeNoise: () => dispatch( actions.emit( audioEvent ) );
  })
)(ReactComponent);
```
---

###### *Comments, questions, github issues, and Pull Requests are welcome* :)
