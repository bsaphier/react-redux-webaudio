// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
const { RenderingAudioContext } = require('web-audio-engine');

// Enzyme.configure({ adapter: new Adapter() });

export default (function() {
  window.AudioContext = RenderingAudioContext;
  global.AudioContext = RenderingAudioContext;
})();
