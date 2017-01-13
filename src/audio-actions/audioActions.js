/*-~-~-~-~-~-~-~- A Reference to the Global Audio Context -~-~-~-~-~-~-~-*/
/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~- && -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-*/
/*-~-~-~-~-~-~-~- A Dictionary of Any Created Audio Nodes -~-~-~-~-~-~-~-*/
export const audioContextAndGraph = {
  context: null,
  audioNodes: {}
};


/*-~-~-~-~-~-~-~-~-~-~- Create an AudioContext Node -~-~-~-~-~-~-~-~-~-~-*/
export const createAudioContext = (AudioCtx) =>
{
  const audioCtx = new AudioCtx();
  audioContextAndGraph.context = audioCtx;
  return audioCtx;
};


/*-~-~-~-~-~-~-~-~-~-~-~- Node Actions/Methods -~-~-~-~-~-~-~-~-~-~-~-*/
export const connect = (connectThisNode, toThatNode) =>
{
  connectThisNode.connect(toThatNode);
};

export const close = (audioCtx) =>
{
  return audioCtx.close();
};

export const suspend = (audioCtx) =>
{
  return audioCtx.suspend();
};

export const resume = (audioCtx) =>
{
  return audioCtx.resume();
};


/*-~-~-~-~-~-~-~-~-~-~-~-~-~- Source Nodes -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
export const createOscillator = (name, audioCtx) =>
{
  audioContextAndGraph.audioNodes[name] = audioCtx.createOscillator();
  return audioContextAndGraph.audioNodes[name];
};


/*-~-~-~-~-~-~-~-~-~-~-~-~-~- Audio Nodes -~-~-~-~-~-~-~-~-~-~-~-~-~-*/
export const createGain = (name, audioCtx) =>
{
  audioContextAndGraph.audioNodes[name] = audioCtx.createGain();
  return audioContextAndGraph.audioNodes[name];
};
