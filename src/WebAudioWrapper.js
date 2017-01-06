import React, { Component } from 'react';

const AudioContext = window.AudioContext || window.webkitAudioContext;

class WebAudioWrapperComponent extends Component {
  componentWillMount() {
    if (this.props.audioContext) {
      return null;
    }

    this.audioContext = (AudioContext)
      ? new AudioContext()
      : {};
  }

  componentWillUnmount() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  getChildContext() {
    return {
      audioContext: this.props.audioContext || this.audioContext
    };
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default WebAudioWrapperComponent;
