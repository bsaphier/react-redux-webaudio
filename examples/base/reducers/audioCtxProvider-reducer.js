export default
(audioContextProvider = window.AudioContext || window.webkitAudioContext) =>
{
  return audioContextProvider;
};
