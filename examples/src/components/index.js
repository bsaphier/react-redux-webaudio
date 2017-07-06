import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from 'react-redux-webaudio';

import { startCtxUI, closeCtxUI, susResAudioCtx } from '../actions';

let closed   = false,
    oscCount = 0;


const Comp = (props) => {

  let { msg, susResToggle } = props.uiReducer;

  function create() {
    props.start();
    oscCount++;
  }

  function kill() {
    props.close();
    closed = true;
  }

  return (
    <div className="main">

      <div className="title">
        <h1>{ msg }</h1>
      </div>

      <br />

      <div className={closed ? 'hide' : ''}>

        <div>
          <p className="bold">LOUD!</p>
          <p>TURN DOWN THE VOLUME!</p>
        </div>

        <div className="btn-wrap">

          <div
            className={`button light ${oscCount > 0 ? 'hide' : ''}`}
            onClick={create}>
            {'CREATE'}
          </div>

          <div
            className={`button ${msg === 'BUZZING' ? 'off' : 'on'} ${oscCount === 0 ? 'hide' : ''}`}
            onClick={msg === 'CLOSE' ? null : props.susRes}>
            {susResToggle}
          </div>

          <div
            className={`button sm ${oscCount === 0 ? 'hide' : ''}`}
            onClick={kill}>
            {'KILL'}
          </div>

        </div>

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


const emit = actionCreators.emit;


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
