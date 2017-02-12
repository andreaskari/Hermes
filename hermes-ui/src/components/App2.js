import React, { Component } from 'react';
// import logo from '../css/logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container ui grid">
        <div className="two wide column"></div>
        <div className="twelve wide column site-title">
          <h1 className="website-name">Hermes</h1>
        </div>
        <div className="two wide column"></div>
        <div className="one wide column"></div>
        <div className="fourteen wide column">
          <div className="ui large fluid secondary pointing menu">
            <a className="active item">
              Home
            </a>
            <a className="item">
              Messages
            </a>
            <a className="item">
              Friends
            </a>
            <div className="right menu">
              <a className="ui item">
                Logout
              </a>
            </div>
          </div>
        </div>
        <div className="one wide column"></div>

        <div className="one wide column"></div>
        <div className="ten wide column">
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
        <div className="five wide column"></div>

        <div className="one wide column"></div>
        <div className="ten wide column">
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
        <div className="five wide column"></div>

        <div className="one wide column"></div>
        <div className="ten wide column">
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
        <div className="five wide column"></div>

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
