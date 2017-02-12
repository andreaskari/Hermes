import React, { Component } from 'react';
// import logo from '../css/logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="ui grid">
        <div className="two wide column"></div>
        <div className="twelve wide column site-title">
          <h1>Hermes</h1>
        </div>
        <div className="two wide column"></div>        
      </div>
    );

    // return (
    //   <div className="App">
    //     <div className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h2>Welcome to React</h2>
    //     </div>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );
  }
}

export default App;
