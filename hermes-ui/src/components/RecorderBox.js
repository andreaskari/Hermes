import React, { Component } from 'react';
import Recorder from 'react-recorder'


export default class RecorderBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      command: props.command,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.command !== this.state.command);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      command: nextProps.command,
    });
  }

  render() {
    if (this.state.command === 'start') {
      console.log('start');
      return (
        <div className="watson-button-container">
          <Recorder 
            command={this.state.command}
            onStop={ this.props.sendAudioRecordingRequest } 
            onMissingAPIs={ () => { console.log("onMissingAPIs FIRED"); } }
          />
          <button 
            className="ui red huge circular icon button"
            onClick={this.props.setRecorderToStop}
          >
            <i className="large white stop icon"></i>
          </button>
        </div>
      );
    }

    console.log('stop');
    return (
      <div className="watson-button-container">
        <Recorder 
          command={this.state.command}
          onStop={ this.props.sendAudioRecordingRequest } 
          onMissingAPIs={ () => { console.log("onMissingAPIs FIRED"); } }
        />
        <button 
          className="ui blue huge circular icon button"
          onClick={this.props.setRecorderToStart}
        >
          <i className="large white tasks icon"></i>
        </button>
      </div>
    );
  }
}
