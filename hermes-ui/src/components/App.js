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
    this.timer = setInterval(this.getBackEndState.bind(this), 1000);
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
      var activeDevice = null;
      var result = JSON.parse(res.body);
      result['devices'].forEach((device) => {
        if (this.state.activeDeviceDisplayed != null && device.name === this.state.activeDeviceDisplayed.name) {
          activeDevice = device;
        }
      })
      this.setState({
        devices: result['devices'], 
        shoppingcart: result['shoppingcart'],
        activeDeviceDisplayed: activeDevice,
      });
    };
    this.makeAPICallWithCallback(method, url, body, headers, callBack);
  }

  sendAudioRecordingRequest(blob) {
    console.log(blob);

    // var fs = require('fs');
    // fs.writeFile("./json/blob", JSON.stringify(blob), function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // }); 

    var method = "POST";
    var url = "http://127.0.0.1:5000/postAudio/";
    var body = {blob: blob};
    var headers = {};
    var callBack = (res) => {
      console.log("received from sendAudioRecordingRequest()");  
      console.log(res.body);   
      // this.setState({: JSON.parse(res.body)});
    };
    this.makeAPICallWithCallback(method, url, body, headers, callBack);

    var method = "POST";
    var url = "http://127.0.0.1:9091/ops/transfers/";
    var body = {
      "direction": "send",              //Required: yes, Values: 'send' for uploads or 'receive' for downloads
      "remote_host": "localhost",       //Required: yes
      "remote_access_key": "h-AC3XuMc8NrG5JPATftC0EpnLe0r7GED_mVJU017II", //Required: no
      "token": "Basic aC1BQzNYdU1jOE5yRzVKUEFUZnRDMEVwbkxlMHI3R0VEX21WSlUwMTdJSTphc3BlcmE=",         //Required: yes, Values: "Bearer xyz" or "Basic xyz" or traditional ATM_* token
      "source_root_id": "1",            //Required: yes when using bearer or basic token, no otherwise
      "destination_root_id": "1",       //Required: yes when using bearer or basic token, no otherwise
      "ssh_port": "33001",              //Required: no, Default: 33001
      "fasp_port": "33001",             //Required: no, Default: 33001
      "remote_user": "xfer",            //Required: no, Default: xfer
      "remote_password": "xxx",         //Required: no, Available since version 3.6.1. When not specified, key-based authentication is implicitly done.
      "multi_session": "1",             //Required: no, Default: 1
      "delete_source": "true",          //Required: no, Default: false; This parameter removes all source files (removes all source files, empty directories and source argument itself)
      "paths": [                        //Required: yes
        {
          "source": "x3"
        }
      ]
    };
    var headers = {
      Authorization: "Basic aC1BQzNYdU1jOE5yRzVKUEFUZnRDMEVwbkxlMHI3R0VEX21WSlUwMTdJSTphc3BlcmE=",
    };
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
