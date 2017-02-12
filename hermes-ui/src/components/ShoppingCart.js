import React, { Component } from 'react';

const ITEMS = [
  {name: "Red 3D Printing Filament", quantity: 2, price: "$34.99"},
  {name: "Green 3D Printing Filament", quantity: 2, price: "$34.99"},
  {name: "Blue 3D Printing Filament", quantity: 2, price: "$34.99"},
  {name: "Yellow 3D Printing Filament", quantity: 2, price: "$34.99"},
  {name: "Orange 3D Printing Filament", quantity: 2, price: "$34.99"},
];

export default class ShoppingCart extends Component {
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
      <div className="sixteen wide column">
        <div className="ui grid">
          { DEVICES.map(this.getDeviceRowHTML.bind(this)) }
        </div>
      </div>
    );
  }
}
