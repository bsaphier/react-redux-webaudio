# react-redux-audio

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), thinly wrapped for easy integration with React-Redux.

# this package is still in progress, with very limited features... it does work though.


## Usage

* include audioContextProvider as one of the reducers in your redux store
* you must dispatch the createGlobalAudioContext action to the audioContextProvider before you do anything else.
* dispatch the included actions to use the web audio api

```javascript
import {
  close,
  resume,
  suspend,
  connect,
  createGain,
  createOscillator,
  audioContextProvider,
  createGlobalAudioContext
} from 'react-redux-audio';
// your other imports here ...



/*-~-~-~-~-~-~-~-~-~-~-~-~-~- YOUR REDUX-STORE -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
const rootReducer = combineReducers({
  //  your reducers ...
  audioContextProvider
});
const store = createStore( rootReducer );



/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~ YOUR REDUCER ~-~-~-~-~-~-~-~-~-~-~-~-~-~-*/
const yourReducer = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {

    case 'CREATE_OSC':
      return nextState;

    case 'CREATE_GAIN':
      return nextState;

    case 'CREATE_MY_INSTRUMENT':
      return nextState

    default:
      return nextState;
  }
};


/*-~-~-~-~-~-~-~-~-~-~-~-~-~- YOUR CONTAINER -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
  const mapStateToProps = (store) => (store);
  const mapDispatchToProps = (dispatch, { audioContextAndGraph }) => {

    const audioContext = audioContextAndGraph.context;
    return {
      createAnAudioContext: () => {

        dispatch(createGlobalAudioContext())
      },
      yourDispatchAction: () => {

        switch (audioContext.state) {
          case 'running':
            dispatch(yourAction());
            break;
          case 'suspended':
            dispatch(yourOtherAction());
            break;
          default:
            console.log('something is not working');
        }
      }
    };
  };


const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(YourDumbComponent);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);

```

## Currently Available Actions:
* setParam
* createGain
* oscillatorStart
* createOscillator
* connectAudioNodes
* closeAudioContext
* resumeAudioContext
* suspendAudioContext
* createGlobalAudioContext
