import React, { Component } from 'react';

import MenuBar from './MenuBar';
import Dashboard from './Dashboard';
import ShoppingCart from './ShoppingCart';
import RecorderBox from './RecorderBox';
import '../css/App.css';

var popsicle = require('popsicle'); 

// const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioCtx = new AudioContext();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: null,
      shoppingcart: null,
      command: 'none',
      activeDeviceDisplayed: null,
      activeMenuOption: 'Dashboard',
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    console.log("DeviceTable: startTimer()");
    this.timer = setInterval(this.getBackEndState.bind(this), 5000);
  }

  stopTimer() {
    if (this.timer) {
      console.log("DeviceTable: stopTimer()");
      clearInterval(this.timer);
      this.timer = null;
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

  getBackEndState() {
    var method = "GET";
    var url = "http://127.0.0.1:5000/getAllInfo/";
    var body = {};
    var headers = {};
    var callBack = (res) => {
      console.log("received from getBackEndState()");  
      console.log(res.body);
      var result = JSON.parse(res.body);
      this.setState({devices: result['devices'], shoppingcart: result['shoppingcart']});
    };
    this.makeAPICallWithCallback(method, url, body, headers, callBack);
  }

  // getTranslation() {
  //   var method = "GET";
  //   var url = "http://127.0.0.1:5000/getAudioTranslation/";
  //   var body = {};
  //   var headers = {};
  //   var callBack = (res) => {
  //     console.log("received from getTranslation()");  
  //     console.log(res.body);
  //     var result = JSON.parse(res.body);
  //     this.setState({translation: result});
  //   };
  //   this.makeAPICallWithCallback(method, url, body, headers, callBack);
  // }

  sendAudioRecordingRequest(blob) {
    console.log(blob);

    var method = "POST";
    var url = "http://127.0.0.1:5000/getAudioTranslation/";
    var body = {blob: blob};
    var headers = {};
    var callBack = (res) => {
      console.log("received from sendAudioRecordingRequest()");  
      console.log(res.body);   
      // this.setState({: JSON.parse(res.body)});
    };
    this.makeAPICallWithCallback(method, url, body, headers, callBack);
  }

  render() {
    var contentHTML = (
      <p className="centered">
        The creators of this program are Andre Askarinam, Rami Shahatit & Parsa Attari
      </p>
    );
    if (this.state.activeMenuOption === 'Dashboard') {
      contentHTML = (
        <Dashboard
          devices={this.state.devices}
          activeDeviceDisplayed={this.state.activeDeviceDisplayed}
          setActiveDeviceDisplayed={(device) => {
            this.setState({activeDeviceDisplayed: device});
          }}
        />
      );
    } else if (this.state.activeMenuOption === 'Shopping Cart') {
      contentHTML = (
        <ShoppingCart 
          shoppingcart={this.state.shoppingcart}
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
              sendAudioRecordingRequest={this.sendAudioRecordingRequest.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
