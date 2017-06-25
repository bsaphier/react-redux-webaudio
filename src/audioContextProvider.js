/*eslint-disable complexity */
import set from 'lodash.set';
import invoke from 'lodash.invoke';


const initialState = {
  audioContext: window.AudioContext || window.webkitAudioContext,
  contextAndGraph: {
    context: null,
    audioNodes: {}
  }
};


const audioContextProvider = (state = initialState, action) => {

  let connectThisNode, toThatNode;

  const nextState = Object.assign({}, state);

  const createAudioContext = AudioCtx => new AudioCtx();


  switch (action.type) {

    // case 'CREATE_AUDIO_CONTEXT':
    //   nextState
    //     .contextAndGraph
    //     .context = createAudioContext(
    //       nextState.audioContext
    //     );
    //
    //   return nextState;


    case 'SUSPEND_AUDIO_CONTEXT':
      nextState
        .contextAndGraph
        .context.suspend();

      return nextState;


    case 'RESUME_AUDIO_CONTEXT':
      nextState
        .contextAndGraph
        .context.resume();

      return nextState;


    case 'CLOSE_AUDIO_CONTEXT':
      nextState
        .contextAndGraph
        .context.close();

      return nextState;


    case 'CONNECT':
      toThatNode = nextState
                    .contextAndGraph
                    .audioNodes[action.toThatNode]
                 ||
                   nextState
                    .contextAndGraph
                    .context
                    .destination;

      connectThisNode = nextState
                        .contextAndGraph
                        .audioNodes[action.connectThisNode];

      connectThisNode.connect(toThatNode);

      return nextState;

    // case 'CONNECT_TO_PARAM':
    //   connectThisNode = nextState
    //                     .contextAndGraph
    //                     .audioNodes[action.connectThisNode];
    //
    //   connectThisNode.connect(action.toThisParam);
    //   return nextState;


    case 'CREATE_BIQUAD_FILTER':
      nextState
        .contextAndGraph
        .audioNodes[action.name] = nextState
                                    .contextAndGraph
                                    .context
                                    .createBiquadFilter(action.maxDelayTime);

      return nextState;


    case 'CREATE_GAIN':
      nextState
        .contextAndGraph
        .audioNodes[action.name] = nextState
                                    .contextAndGraph
                                    .context
                                    .createGain();

      return nextState;


    // case 'CREATE_DELAY':
    //   nextState
    //     .contextAndGraph
    //     .audioNodes[action.name] = nextState
    //                                 .contextAndGraph
    //                                 .context
    //                                 .createDelay(action.maxDelayTime || 1.0);
    //
    //   return nextState;
    //
    //
    // case 'CREATE_CONVOLVER':
    //   nextState
    //     .contextAndGraph
    //     .audioNodes[action.name] = nextState
    //                                 .contextAndGraph
    //                                 .context
    //                                 .createConvolver();
    //
    //   return nextState;
    //
    //
    // case 'CREATE_DYNAMICS_COMPRESSOR':
    //   nextState
    //     .contextAndGraph
    //     .audioNodes[action.name] = nextState
    //                                 .contextAndGraph
    //                                 .context
    //                                 .createDynamicsCompressor();
    //
    //   return nextState;


    case 'CREATE_OSCILLATOR':
      nextState
        .contextAndGraph
        .audioNodes[action.name] = nextState
                                    .contextAndGraph
                                    .context
                                    .createOscillator();

      return nextState;


    // case 'CREATE_BUFFER_SOURCE':
    //   nextState
    //     .contextAndGraph
    //     .audioNodes[action.name] = nextState
    //                                 .contextAndGraph
    //                                 .context
    //                                 .createBufferSource();
    //
    //   return nextState;
    //
    //
    // case 'DECODE_AUDIO_DATA':
    //   nextState.contextAndGraph.context
    //     .decodeAudioData(action.audioData)
    //     .then(action.callbackFunc);
    //
    //   return nextState;


    case 'START_SOURCE_NODE':
      nextState
        .contextAndGraph
        .audioNodes[action.name].start(action.time);

      return nextState;


    case 'SET_PARAM':
      set(
        nextState.contextAndGraph.audioNodes,
        action.param,
        action.value
      );

      return nextState;


    // case 'SET_VALUE_AT_TIME':
    //   invoke(
    //     nextState.contextAndGraph.audioNodes,
    //     `${action.param}.setValueAtTime`,
    //     action.value,
    //     action.startTime
    //   );
    //
    //   return nextState;
    //
    //
    // case 'LINEAR_RAMP_TO_VALUE_AT_TIME':
    //   invoke(
    //     nextState.contextAndGraph.audioNodes,
    //     `${action.param}.linearRampToValueAtTime`,
    //     action.value,
    //     action.endTime
    //   );
    //
    //   return nextState;


    default:
      return nextState;

  }
};

export default audioContextProvider;
