/*eslint-disable complexity */
import set from 'lodash.set';
import invoke from 'lodash.invoke';


const audioProvider = {
  audioContext: window.AudioContext || window.webkitAudioContext,
  audioContextAndGraph: {
    context: null,
    audioNodes: {}
  }
};


const audioContextProvider = (contextProvider = audioProvider, action) => {

  let connectThisNode, toThatNode;

  const nextProviderState = Object.assign({}, contextProvider);

  const createAudioContext = AudioCtx => new AudioCtx();


  switch (action.type) {
    case 'CREATE_AUDIO_CONTEXT':
      nextProviderState
        .audioContextAndGraph
        .context = createAudioContext(
          nextProviderState.audioContext
        );
      return nextProviderState;


    case 'SUSPEND_AUDIO_CONTEXT':
      nextProviderState
        .audioContextAndGraph
        .context.suspend();
      return nextProviderState;


    case 'RESUME_AUDIO_CONTEXT':
      nextProviderState
        .audioContextAndGraph
        .context.resume();
      return nextProviderState;


    case 'CLOSE_AUDIO_CONTEXT':
      nextProviderState
        .audioContextAndGraph
        .context.close();
      return nextProviderState;


    case 'CONNECT':
      toThatNode = nextProviderState
                    .audioContextAndGraph
                    .audioNodes[action.toThatNode]
                 ||
                   nextProviderState
                    .audioContextAndGraph
                    .context
                    .destination;

      connectThisNode = nextProviderState
                        .audioContextAndGraph
                        .audioNodes[action.connectThisNode];

      connectThisNode.connect(toThatNode);
      return nextProviderState;

    // case 'CONNECT_TO_PARAM':
    //   connectThisNode = nextProviderState
    //                     .audioContextAndGraph
    //                     .audioNodes[action.connectThisNode];
    //
    //   connectThisNode.connect(action.toThisParam);
    //   return nextProviderState;


    case 'CREATE_BIQUAD_FILTER':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name] = nextProviderState
                                    .audioContextAndGraph
                                    .context
                                    .createBiquadFilter(action.maxDelayTime);
      return nextProviderState;


    case 'CREATE_GAIN':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name] = nextProviderState
                                    .audioContextAndGraph
                                    .context
                                    .createGain();
      return nextProviderState;


    case 'CREATE_DELAY':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name] = nextProviderState
                                    .audioContextAndGraph
                                    .context
                                    .createDelay();
      return nextProviderState;


    case 'CREATE_CONVOLVER':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name] = nextProviderState
                                    .audioContextAndGraph
                                    .context
                                    .createConvolver();
      return nextProviderState;


    case 'CREATE_OSCILLATOR':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name] = nextProviderState
                                    .audioContextAndGraph
                                    .context
                                    .createOscillator();
      return nextProviderState;


    case 'CREATE_BUFFER_SOURCE':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name] = nextProviderState
                                    .audioContextAndGraph
                                    .context
                                    .createBufferSource();
      return nextProviderState;


    case 'DECODE_AUDIO_DATA':
      nextProviderState.audioContextAndGraph.context
        .decodeAudioData(action.audioData)
        .then(action.callbackFunc);
      return nextProviderState;


    case 'START_SOURCE_NODE':
      nextProviderState
        .audioContextAndGraph
        .audioNodes[action.name].start(action.time);
      return nextProviderState;


    case 'SET_PARAM':
      set(
        nextProviderState.audioContextAndGraph.audioNodes,
        action.param,
        action.value
      );
      return nextProviderState;


    case 'SET_VALUE_AT_TIME':
      invoke(
        nextProviderState.audioContextAndGraph.audioNodes,
        `${action.param}.setValueAtTime`,
        action.value,
        action.startTime
      );
      return nextProviderState;


    case 'LINEAR_RAMP_TO_VALUE_AT_TIME':
      invoke(
        nextProviderState.audioContextAndGraph.audioNodes,
        `${action.param}.linearRampToValueAtTime`,
        action.value,
        action.endTime
      );
      return nextProviderState;


    default:
      return nextProviderState;
  }
};

export default audioContextProvider;
