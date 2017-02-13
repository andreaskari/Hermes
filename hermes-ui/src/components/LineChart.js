import React, { Component } from 'react';

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  render() {
    // remember that activeDeviceDisplayed is null first
    if (this.state.data == null) {
      return (
        <div className="row">
        </div>
      );
    }

    return (
      <div id='chart-container'>
        <div id="lineChart" data-bind="ojComponent: {
            component: 'ojChart', 
            type: 'line',
            series: lineSeriesValue, 
            groups: lineGroupsValue, 
            animationOnDisplay: 'auto',
            animationOnDataChange: 'auto',
            orientation: orientationValue,
            hoverBehavior: 'dim'
            }"
             style="max-width:500px;width:100%;height:350px;">
        </div>
        <div id="radioButtonset" data-bind="ojComponent: {component: 'ojButtonset', focusManagement:'none', checked: orientationValue, chroming: 'half'}" 
                 aria-controls="lineChart" aria-label="Choose an orientation.">
                  <label data-bind="attr: {for: id}"></label>
                  <input type="radio" name="orientation"
                       data-bind="value: value, attr: {id: id},
                       ojComponent: {component: 'ojButton', label: label, 
                                         icons: {start: icon}, display: 'icons'}"/>
        </div>
      </div>
    );
  }
}
