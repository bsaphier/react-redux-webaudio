/*-~-~-~-~-~-~-~-~-~-~- Create an AudioContext Node -~-~-~-~-~-~-~-~-~-~-*/
export const createGlobalAudioContext = () => ({
  type: 'CREATE_AUDIO_CONTEXT'
});


/*-~-~-~-~-~-~-~-~-~-~-~-~-~- Create Source Nodes -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
export const createOscillator = (name) => ({
  type: 'CREATE_OSCILLATOR',
  name
});

export const createBufferSource = (name) => ({
  type: 'CREATE_BUFFER_SOURCE',
  name
});


/*-~-~-~-~-~-~-~-~-~-~-~-~-~- Create Audio Nodes -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
export const createGain = (name) => ({
  type: 'CREATE_GAIN',
  name
});

export const createBiquadFilter = (name) => ({
  type: 'CREATE_BIQUAD_FILTER',
  name
});

export const createConvolver = (name) => ({
  type: 'CREATE_CONVOLVER',
  name
});

export const createDynamicsCompressor = (name) => ({
  type: 'CREATE_DYNAMICS_COMPRESSOR',
  name
});

export const createDelay = (name, maxDelayTime) => ({
  type: 'CREATE_DELAY',
  name,
  maxDelayTime
});


/*-~-~-~-~-~-~-~-~-~-~-~- AudioContext Methods -~-~-~-~-~-~-~-~-~-~-~-*/
export const suspendAudioContext = () => ({
  type: 'SUSPEND_AUDIO_CONTEXT'
});

export const resumeAudioContext = () => ({
  type: 'RESUME_AUDIO_CONTEXT'
});

export const closeAudioContext = () => ({
  type: 'CLOSE_AUDIO_CONTEXT'
});


/*-~-~-~-~-~-~-~-~-~-~-~- Source Node Methods -~-~-~-~-~-~-~-~-~-~-~-*/
export const oscillatorStart = (name, time) => ({
  type: 'START_SOURCE_NODE',
  name,
  time
});


/*-~-~-~-~-~-~-~-~-~-~-~- Audio Node Methods -~-~-~-~-~-~-~-~-~-~-~-*/
export const connectAudioNodes = (connectThisNode, toThatNode) => ({
  type: 'CONNECT',
  connectThisNode,
  toThatNode
});

// export const connectNodeToParam = (connectThisNode, toThisParam) => ({
//   type: 'CONNECT_TO_PARAM',
//   connectThisNode,
//   toThisParam
// });

export const setParam = (param, value) => ({
  type: 'SET_PARAM',
  param,
  value
});

export const setValueAtTime = (param, value, startTime) => ({
  type: 'SET_VALUE_AT_TIME',
  param,
  value,
  startTime
});

export const linearRampToValueAtTime = (param, value, endTime) => ({
  type: 'LINEAR_RAMP_TO_VALUE_AT_TIME',
  param,
  value,
  endTime
});

export const decodeAudioData = (audioData, callbackFunc) => ({
  type: 'DECODE_AUDIO_DATA',
  audioData,
  callbackFunc
});
