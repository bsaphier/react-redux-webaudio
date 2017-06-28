import React from 'react';
import { connect } from 'react-redux';

import { playSynthUI, pauseSynthUI } from '../actions';
import { emit } from '../../rrwa/actions';


const Comp = (props) => {

  let { action } = props.uiReducer;

  return (
    <div>

      <div>{`ACTION: ${ action }`}</div>

      <br />

      <div>

        <button type="button" onClick={props.play}>{'START'}</button>

        <button type="button" onClick={props.pause}>{'STOP'}</button>

      </div>

    </div>
  );
};


const playSynth = (audioCtx, currTime) => {
  //: TODO
};


const testTime = (audioCtx, currTime) => {
  console.log( currTime );
  return 'HI';
};


export default connect(
  state => ({...state}),
  dispatch => ({
    play:  () => {
      dispatch( playSynthUI() );
      dispatch( emit( testTime ) );
    },
    pause: () => {
      dispatch( pauseSynthUI() );
      // dispatch( pauseSynth() );
    }
  })
)(Comp);
