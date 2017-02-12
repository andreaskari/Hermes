import React, { Component } from 'react';
// import LineChart2 from './LineChart2';

const DEVICES = ["3D Printer", "Refrigerator", "Coffee Machine"];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: props.devices,
      activeDeviceDisplayed: props.activeDeviceDisplayed,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      devices: nextProps.devices,
      activeDeviceDisplayed: nextProps.activeDeviceDisplayed,
    });
  }

  getDeviceRowHTML(device) {
    var onClick = () => {
      this.props.setActiveDeviceDisplayed(device);
    };

    return (
      <div className="sixteen wide column" key={device.name} onClick={onClick}>
        <div className="ui icon message">
          <i className="green circle icon"></i>
          <div className="content">
            <div className="header">
              { device.name }
            </div>
            <p>Status: Active</p>
          </div>
        </div>
      </div>
    );
  }

  getRowHTML(datapoint) {
    return (
      <tr key={datapoint}>
        <td key={datapoint}>
          {datapoint}
        </td>
      </tr>
    );
  }

  render() {
    // remember that activeDeviceDisplayed is null first
    if (this.state.devices == null) {
      return (
        <div className="row">
        </div>
      );
    }

    var device = (
      <div className="ui stacked fluid segment">
        <h2 className="ui header">
          No Device Selected
        </h2>
      </div>
    );
    if (this.state.activeDeviceDisplayed != null) {
      // device = this.state.activeDeviceDisplayed.name;
      var length = this.state.activeDeviceDisplayed.data.length;
      var amount = Math.min(length, 5);
      console.log(this.state.activeDeviceDisplayed.data.slice(length - amount, length));
      device = (
        <div className="ui stacked fluid segment">
          <h2 className="ui header">
            {this.state.activeDeviceDisplayed.name}
          </h2>
          <div className="ui info message">
            <div className="header">
              {this.state.activeDeviceDisplayed.status}
            </div>
            <p>Status</p>
          </div>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {this.state.activeDeviceDisplayed.data.slice(length - amount, length).map(this.getRowHTML)}
            </tbody>
          </table>
        </div>
      );
    }


    return (
      <div className="row">
        <div className="eight wide column">
          <div className="ui grid">
            { this.state.devices.map(this.getDeviceRowHTML.bind(this)) }
          </div>
        </div>
        <div className="eight wide column">
            <div className="needs-padding">
              { device }
            </div>
        </div>
      </div>
    );
  }
}
