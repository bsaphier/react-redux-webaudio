# react-redux-webaudio

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.

# this package is still in progress, does not include any tests and is subject to change...

## Installation
```bash
npm i react-redux-webaudio
```

## Documentation

### RRWAEngine
* The React component.

### webAudioReducer
* The reducer.

### actions
* Do stuff.

#

* include webAudioReducer as one of the reducers in your redux store
```javascript
const rootReducer = combineReducers({
  ...
  webAudioReducer
});

const store = createStore( rootReducer );
```

* Ideally, place RRWAEngine in your top level component
```javascript

ReactDOM.render(
  <Provider store={store}>
    <RRWAEngine />
    <App />
  </Provider>,
  document.getElementById('app')
);
```

* the emit action creator gets passed a reference to an instance of window.AudioContext
```javascript
let audioEvent = (audioContext, currentTime) => {

  let oscillator = audioContext.createOscillator();
  let gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.value = 100;
  oscillator.start(currentTime);

  gainNode.gain.value = 0.1;

};


const Container = connect(
  state => state,
  dispatch => ({
    makeNoise: () => dispatch( actions.emit( audioEvent ) );
  })
)(ReactComponent);
```
