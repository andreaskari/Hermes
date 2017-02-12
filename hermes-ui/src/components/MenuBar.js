import React, { Component } from 'react';

const OPTIONS = ["Dashboard", "Shopping Cart", "About"];

export default class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenuOption: props.activeMenuOption,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeMenuOption: nextProps.activeMenuOption,
    });
  }

  getMenuOptionHTML(option) {
    var itemProperty = "item";
    if (this.state.activeMenuOption === option) {
      itemProperty = "active item";
    }

    var onClick = () => {
      this.props.setActiveMenuOption(option);
    }

    if (option === "Dashboard") {
      return (
        <a className={itemProperty} onClick={onClick} key={option}>
          <i className="tasks icon"></i>
          Dashboard
        </a>
      );
    } else if (option === "Shopping Cart") {
      return (
        <a className={itemProperty} onClick={onClick} key={option}>
          <i className="shop icon"></i>
          Shopping Cart
        </a>
      );
    } else {
      return (
        <a className={itemProperty} onClick={onClick} key={option}>
          <i className="space shuttle icon"></i>
          About
        </a>
      );
    } 
  }

  render() {
    return (
      <div className="sixteen wide column">
        <div className="ui three item labeled icon fluid menu">
          { OPTIONS.map(this.getMenuOptionHTML.bind(this)) }
        </div>
      </div>
    );
  }
}
