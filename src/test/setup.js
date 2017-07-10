const { StreamAudioContext } = require('web-audio-engine');

export default (function() {
  global.AudioContext = StreamAudioContext;
})();
