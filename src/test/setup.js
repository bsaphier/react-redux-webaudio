import { RenderingAudioContext } from 'web-audio-engine';
window.AudioContext = RenderingAudioContext;

// export default (function() {
//   window.AudioContext = RenderingAudioContext;
//   global.AudioContext = RenderingAudioContext;
// })();
