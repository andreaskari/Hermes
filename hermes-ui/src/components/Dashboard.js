import React, { Component } from 'react';

const DEVICES = ["3D Printer", "Refrigerator", "Coffee Machine"];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDeviceDisplayed: props.activeDeviceDisplayed,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeDeviceDisplayed: nextProps.activeDeviceDisplayed,
    });
  }

  getDeviceRowHTML(device) {
    var onClick = () => {
      this.props.setActiveDeviceDisplayed(device);
    };

    return (
      <div className="sixteen wide column" key={device} onClick={onClick}>
        <div className="ui icon message">
          <i className="green circle icon"></i>
          <div className="content">
            <div className="header">
              { device }
            </div>
            <p>Status: Active</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // remember that activeDeviceDisplayed is null first

    return (
      <div className="row">
        <div className="eight wide column">
          <div className="ui grid">
            { DEVICES.map(this.getDeviceRowHTML.bind(this)) }
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
    );
  }
}
