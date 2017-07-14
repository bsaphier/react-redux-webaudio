import { Component } from 'react';
import { connect } from 'react-redux';

import { clearEvtQueue } from '../action-creators';


let AudioContext = window.AudioContext || window.webkitAudioContext;


/*********************************
 *
 * Export everything, for testing.
 *
 *********************************/
export const mapState = ({ webAudioReducer }) => ({ ...webAudioReducer });


export const mapDispatch = (dispatch) => ({
  clearQ:  () => dispatch( clearEvtQueue() )
});


export class RRWA extends Component {

  constructor(props) {
    super(props);
    this.getCurrTime = this.getCurrTime.bind(this);
  }

  componentWillMount() {
    if (AudioContext) {
      this.audioContext = new AudioContext();
    }
  }

  componentWillUnmount() {
    this.audioContext.close();
  }

  componentWillReceiveProps(props) {
    if (props.events.length) {
      props.events.forEach(this.processEvent.bind(this));
      props.clearQ();
    }
  }

  shouldComponentUpdate(props) {
    return props.events.length > 0;
  }

  processEvent({ event }) {
    event( this.audioContext, this.getCurrTime() );
  }

  getCurrTime() {
    return this.audioContext.currentTime;
  }

  render() {
    return null;
  }

}


export default connect(mapState, mapDispatch)( RRWA );
