/**
 * @typedef {{*}} AudioContext - A Reference to the global AudioContent object.
 * @typedef {number} Time
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from 'react-redux-webaudio';
import { startCtxUI, closeCtxUI, susResAudioCtx } from '../actions';
const { emit } = actionCreators;


/**
 * This is an audio event that will be handled by `react-redux-webaudio`.
 * @param {AudioContext} audioCtx - A Reference to the global AudioContent object.
 * @param {Time} [currTime] - The time when this event is invoked.
 */
const start = (audioCtx, currTime) => {
  // create Oscillator and gain node
  let oscillator = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();

  // connect oscillator to gain node to speakers
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Make noise, sweet noise
  oscillator.type = 'square';
  oscillator.frequency.value = 100; // value in hertz
  oscillator.start(currTime);

  gainNode.gain.value = 0.1;
};

/** Another audio event. */
const susRes = (audioCtx) => {
  if (audioCtx.state === 'running') {
    audioCtx.suspend();
  } else if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

/** Another audio event. */
const close = (audioCtx) => audioCtx.close();


/** React Component */
class RRWAExamplesApp extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
      oscCount: 0
    };
  }

  handleCreate = () => {
    this.props.start();
    this.setState({ oscCount: this.state.oscCount + 1 });
  }

  handleKill = () => {
    this.props.kill();
    this.setState({ closed: true });
  }

  render() {
    const { msg, susRes, susResToggle } = this.props.uiReducer;

    return (
      <div className="main">
        <div className="title"><h1>{msg}</h1></div>
        <br />
        <div className={closed ? 'hide' : ''}>
          <div>
            <p className="bold">LOUD!</p>
            <p>TURN DOWN THE VOLUME!</p>
          </div>
          <div className="btn-wrap">
            <div
              className={`button light ${oscCount > 0 ? 'hide' : ''}`}
              onClick={this.create}>
              {'CREATE'}
            </div>
            <div
              className={`button ${msg === 'BUZZING' ? 'off' : 'on'} ${oscCount === 0 ? 'hide' : ''}`}
              onClick={msg === 'CLOSE' ? null : susRes}>
              {susResToggle}
            </div>
            <div
              className={`button sm ${oscCount === 0 ? 'hide' : ''}`}
              onClick={this.kill}>
              {'KILL'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({...state}),
  dispatch => ({
    start:  () => {
      dispatch( startCtxUI() );
      dispatch( emit( start ) );
    },
    susRes: () => {
      dispatch( susResAudioCtx() );
      dispatch( emit( susRes ) );
    },
    close: () => {
      dispatch( closeCtxUI() );
      dispatch( emit( close ) );
    },
  })
)(RRWAExamplesApp);
