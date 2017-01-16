# react-redux-audio

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.

# this package is still in progress, with very limited features... it does work though.

## Installation
```bash
npm i react-redux-webaudio
```

## Usage

```javascript
import { audioContextProvider, audioActionCreators } from 'react-redux-webaudio';
// your other imports here ...

/*-~-~-~-~-~-~-~-~-~-~-~-~-~- YOUR REDUX-STORE -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
const rootReducer = combineReducers({
  //  your reducers ...
  audioContextProvider
});
const store = createStore( rootReducer );


/*-~-~-~-~-~-~-~-~-~-~-~-~-~- YOUR CONTAINER -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
const App = connect(
  store => store,
  dispatch => ({
    // you MUST do something like this before using any other actions!!
    createGlobalAudioContext: () =>
      dispatch(audioActionCreators.createGlobalAudioContext()),
    yourNoiseyAction: () => {
      // create some audio nodes
      dispatch(audioActionCreators.createOscillator('osc'));
      dispatch(audioActionCreators.createGain('gainNode'));
      // connect the nodes
      dispatch(audioActionCreators.connectAudioNodes('osc', 'gainNode'));
      dispatch(audioActionCreators.connectAudioNodes('gainNode'));
      // assign values to node params
      dispatch(audioActionCreators.setParam('osc.type', 'square'));
      dispatch(audioActionCreators.setParam('osc.frequency.value', 100));
      dispatch(audioActionCreators.oscillatorStart('osc', 0));
      dispatch(audioActionCreators.setParam('gainNode.gain.value', 0.1));
    }
  })
)(YourDumbComponent);
```
* include audioContextProvider as one of the reducers in your redux store
* you must dispatch the createGlobalAudioContext action to the audioContextProvider before you do anything else.
* dispatch the included actions to use the web audio api

## Currently Available Actions:
* setParam
```javascript
setParam('any.audio.node.param', 'theValueYouWantItToBe');
```
* createGain
```javascript
createGain('theNameOfYourNewGainNode');
```
* oscillatorStart
* createOscillator
```javascript
createOscillator('theNameOfYourNewOscillatornNode');
```
* connectAudioNodes
```javascript
connectAudioNodes('connectThisNode', 'toThisNode');
```
* closeAudioContext
* resumeAudioContext
* suspendAudioContext
* createGlobalAudioContext
```javascript
createGlobalAudioContext() // => creates an instance of window.AudioContext
```
