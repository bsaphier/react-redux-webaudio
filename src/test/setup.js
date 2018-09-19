const { RenderingAudioContext } = require('web-audio-engine');

export default (function() {
  window.AudioContext = RenderingAudioContext;
  global.AudioContext = RenderingAudioContext;
})();
