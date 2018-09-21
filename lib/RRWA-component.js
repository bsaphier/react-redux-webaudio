function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Export everything, for testing. */
import { Component } from 'react';
import { connect } from 'react-redux';
import { clearEvtQueue } from './action-creators';
export class RRWA extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "processEvent", ({
      event
    }) => {
      event(this.audioContext, this.getCurrTime);
    });

    _defineProperty(this, "getCurrTime", () => {
      return this.audioContext.currentTime;
    });

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (AudioContext) {
      this.audioContext = new AudioContext();
    } else {
      throw new Error('This environment does not support the web audio API.');
    }
  }

  componentDidMount() {
    if (this.props.events.length) {
      this.props.events.forEach(this.processEvent);
      this.props.clearQ();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.events.length > 0;
  }

  componentDidUpdate() {
    if (this.props.events.length) {
      this.props.events.forEach(this.processEvent);
      this.props.clearQ();
    }
  }

  componentWillUnmount() {
    this.audioContext.close();
  }

  render() {
    return null;
  }

}
export const mapState = ({
  webAudioReducer
}) => _objectSpread({}, webAudioReducer);
export const mapDispatch = dispatch => ({
  clearQ: () => dispatch(clearEvtQueue())
});
export default connect(mapState, mapDispatch)(RRWA);