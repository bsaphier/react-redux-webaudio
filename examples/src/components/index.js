import React from 'react';
import { connect } from 'react-redux';

import { startCtxUI, closeCtxUI, susResAudioCtx } from '../actions';
import { actionCreators } from '../../../../react-redux-webaudio';


const emit = actionCreators.emit;


const Comp = (props) => {

  let { action, susResToggle } = props.uiReducer;

  return (
    <div>

      <div>{`ACTION: ${ action }`}</div>

      <br />

      <div>

        <button type="button" onClick={props.start}>{'START'}</button>

        <button type="button" onClick={props.susRes}>{susResToggle}</button>

        <button type="button" onClick={props.close}>{'CLOSE'}</button>

      </div>

    </div>
  );
};


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


const susRes = (audioCtx) => {
  if (audioCtx.state === 'running') {
    audioCtx.suspend();
  } else if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};


const close = (audioCtx) => {
  audioCtx.close();
};


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
)(Comp);
