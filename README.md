# react-redux-webaudio

###### The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.

#### Installation:
```bash
npm i react-redux-webaudio
```

---

### **Documentation**

- React-Redux-Webaudio consists of two main parts: a Redux reducer and a React component.
- Only one action is required for almost any scenario: emit. Pass the emit action an array or a callback function. The callback which will be pushed on to a queue of audio "*events*". If emit is given an array, the array will be concatenated with the current queue of audio "*events*".

The package contains three main modules:
  - **webAudioReducer** – *The reducer.*
  - **actions** ––––––––––– *The module containing Redux action-creators. You only need emit.*
  - **RRWAEngine** ––––– *The React component.*


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

Dispatch the emit action-creator with an event or array of events. Each event will be passed a reference to an instance of window.AudioContext as well as the the '*currentTime*' of that instance.

```javascript
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

###### Issues and Pull Requests always welcome :)
