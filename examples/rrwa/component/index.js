import React from 'react';
import { connect } from 'react-redux';

import { emit, clearEvtQueue } from '../actions';


class RRWA extends React.Component {

  constructor(props) {
    super(props);

    this.getCurrTime = this.getCurrTime.bind(this);
  }

  componentWillMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
    /*
     * @event is a function containing webaudio API calls
     */
    event( this.audioContext, this.getCurrTime() );
    console.log( 'after', this.getCurrTime() );
  }

  getCurrTime() {
    return this.audioContext.currentTime;
  }

  render() {
    console.log('RRWA', this.props);
    return null;
  }

}


const mapState = ({ webAudioReducer }) => ({ ...webAudioReducer });


const mapDispatch = (dispatch) => ({
  emit: (evt) => dispatch( emit(evt) ),
  clearQ:  () => dispatch( clearEvtQueue() )
});


export default connect(mapState, mapDispatch)(RRWA);
