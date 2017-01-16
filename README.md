# react-redux-audio

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.

# this package is still in progress, with very limited features... it does work though.

## Use:
* include audioContextProvider as one of the reducers in your redux store
* you must dispatch the createGlobalAudioContext action to the audioContextProvider before you do anything else.
* dispatch the included actions to use the web audio api

## Currently Available Actions:
* createOscillator
* createGain
* suspendAudioContext
* resumeAudioContext
* closeAudioContext
* oscillatorStart
* connectAudioNodes
* setParam
