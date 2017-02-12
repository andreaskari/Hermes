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
      shoppingcart: props.shoppingcart,
      // activeDeviceDisplayed: props.activeDeviceDisplayed,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shoppingcart: nextProps.shoppingcart,
      // activeDeviceDisplayed: nextProps.activeDeviceDisplayed,
    });
  }

  getItemRowHTML(item) {
    // var onClick = () => {
    //   this.props.setActiveDeviceDisplayed(device);
    // };

    return (
      <div className="sixteen wide column">
        <div className="ui info message" key={item.name}>
          <div className="content">
            <div className="ui grid">
              <div className="ui ten wide column">
                <p>{item.name}</p>
                <div className="ui sub header">Item Name</div>
              </div>
              <div className="ui three wide column">
                <p>{item.quantity}</p>
                <div className="ui sub header">Quantity</div>
              </div>
              <div className="ui three wide column">
                <p>{item.price}</p>
                <div className="ui sub header">Price</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // remember that activeDeviceDisplayed is null first
    if (this.state.shoppingcart == null) {
      return (
        <div className="sixteen wide column">
        </div>
      );
    }

    return (
      <div className="sixteen wide column">
        <div className="ui grid">
          { this.state.shoppingcart.map(this.getItemRowHTML.bind(this)) }
        </div>
      </div>
    );
  }
}
