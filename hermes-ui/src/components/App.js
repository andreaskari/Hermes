import React, { Component } from 'react';

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
    // var body = {};
    // var headers = {};
    // var callBack = (res) => {
    //   console.log("received from sendAudioRecordingRequest()");  
    //   console.log(res.body);   
    //   // this.setState({: JSON.parse(res.body)});
    // };
    // this.makeAPICallWithCallback(method, url, body, headers, callBack);
  }

  render() {

    return (
      <div className="app-container">
        <div className="ui grid">
          <div className="sixteen wide column site-title">
            <h1 className="website-name">Hermes</h1>
          </div>

          <div className="sixteen wide column">
            <div className="ui three item labeled icon fluid menu">
              <a className="item">
                <i className="tasks icon"></i>
                Dashboard
              </a>
              <a className="item">
                <i className="shop icon"></i>
                Shopping Cart
              </a>
              <a className="item">
                <i className="space shuttle icon"></i>
                About
              </a>
            </div>
          </div>

          <div className="eight wide column">
            <div className="ui grid">
              <div className="sixteen wide column">
                <div className="ui icon message">
                  <i className="green circle icon"></i>
                  <div className="content">
                    <div className="header">
                      3D Printer
                    </div>
                    <p>Status: Active</p>
                  </div>
                </div>
              </div>

              <div className="sixteen wide column">
                <div className="ui icon message">
                  <i className="green circle icon"></i>
                  <div className="content">
                    <div className="header">
                      Refrigerator
                    </div>
                    <p>Status: Active</p>
                  </div>
                </div>
              </div>

              <div className="sixteen wide column">
                <div className="ui icon message">
                  <i className="green circle icon"></i>
                  <div className="content">
                    <div className="header">
                      Coffee Machine
                    </div>
                    <p>Status: Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="eight wide column">
            <div className="ui grid">
              <div className="needs-padding">
                <div className="ui stacked segment">
                  <h4 className="ui header">A header</h4>
                  <p>Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem, est autem aliquip detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei ex natum rebum iisque.</p>
                   <p>Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide phaedrum, vim vivendum maiestatis in.</p>
                   <p>Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu per, quas minimum postulant per id.</p>
                </div>
              </div>
            </div>
          </div>

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
