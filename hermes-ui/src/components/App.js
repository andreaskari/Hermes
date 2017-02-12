import React, { Component } from 'react';

import MenuBar from './MenuBar';
import Dashboard from './Dashboard';
import RecorderBox from './RecorderBox';
import '../css/App.css';

var popsicle = require('popsicle'); 

// const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioCtx = new AudioContext();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      command: 'none',
      activeDeviceDisplayed: null,
      activeMenuOption: 'Dashboard',
    }
  }

  makeAPICallWithCallback(method, url, body, headers, callBack) {
    popsicle.request({
      method: method,
      url: url,
      body: body,
      headers: headers,
      options: { rejectUnauthorized: false }
    })
    .then((res) => { callBack(res); })
  }

  sendAudioRecordingRequest(blob) {
    console.log(blob);

    // var method = "POST";
    // var url = "";
    // var body = {blob: blob};
    // var headers = {};
    // var callBack = (res) => {
    //   console.log("received from sendAudioRecordingRequest()");  
    //   console.log(res.body);   
    //   // this.setState({: JSON.parse(res.body)});
    // };
    // this.makeAPICallWithCallback(method, url, body, headers, callBack);
  }

  render() {
    var contentHTML = (
      <p>The creators of this program are Andre Askarinam, Rami Shahatit & Parsa Attari</p>
    );
    if (this.state.activeMenuOption === 'Dashboard') {
      contentHTML = (
        <Dashboard 
          activeDeviceDisplayed={this.state.activeDeviceDisplayed}
          setActiveDeviceDisplayed={(device) => {
            this.setState({activeDeviceDisplayed: device});
          }}
        />
      );
    } else if (this.state.activeMenuOption === 'Shopping Cart') {
      contentHTML = (
        <Dashboard 
          activeDeviceDisplayed={this.state.activeDeviceDisplayed}
          setActiveDeviceDisplayed={(device) => {
            this.setState({activeDeviceDisplayed: device});
          }}
        />
      );
    } 

    return (
      <div className="app-container">
        <div className="ui grid">
          <div className="sixteen wide column site-title">
            <h1 className="website-name">Hermes</h1>
          </div>

          <MenuBar 
            activeMenuOption={this.state.activeMenuOption}
            setActiveMenuOption={(option) => {
              this.setState({activeMenuOption: option});
            }}
          />

          { contentHTML }

        </div>

        <div className="watson-container">
          <div className="ui raised fluid segment">
            <RecorderBox 
              command={this.state.command}
              setRecorderToStart={() => {
                this.setState({command: 'start'});
              }}
              setRecorderToStop={() => {
                this.setState({command: 'stop'});
              }}
              sendAudioRecordingRequest={this.sendAudioRecordingRequest}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
