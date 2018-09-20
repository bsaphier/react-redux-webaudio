/** Export everything, for testing. */
import { Component } from 'react';
import { connect } from 'react-redux';
import { clearEvtQueue } from './action-creators';


export class RRWA extends Component {

  constructor(props) {
    super(props);
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

  processEvent = ({ event }) => {
    event( this.audioContext, this.getCurrTime() );
  }

  getCurrTime = () => {
    return this.audioContext.currentTime;
  }

  render() {
    return null;
  }
}


export const mapState = ({ webAudioReducer }) => ({ ...webAudioReducer });

export const mapDispatch = dispatch => ({
  clearQ: () => dispatch(clearEvtQueue())
});

export default connect(mapState, mapDispatch)( RRWA );
