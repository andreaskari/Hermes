import React, { Component } from 'react';

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojchart'],
function(oj, ko, $)
{   
    function ChartModel() {
        var colorHandler = new oj.ColorAttributeGroupHandler();
        this.barColor = colorHandler.getValue('barColor');
        this.rangeBarColor = colorHandler.getValue('rangeBarColor');
        this.lineColor = colorHandler.getValue('lineColor');
        this.lineWithAreaColor = colorHandler.getValue('lineWithAreaColor');
        this.areaColor = colorHandler.getValue('areaColor');
        this.rangeAreaColor = colorHandler.getValue('rangeAreaColor');
        
        /* chart data */
        var values = [5, 8, 2, 7, 0, 9, 2, 3, 4, 2];
        
        this.sparkValues = ko.observableArray(values);
        
        var rangeValues = [{low: 5, high: 9},
                           {low: 3, high: 7},
                           {low: 3, high: 8},
                           {low: 5, high: 10},
                           {low: 7, high: 14},
                           {low: 8, high: 13},
                           {low: 6, high: 11},
                           {low: 4, high: 9},
                           {low: 1, high: 5},
                           {low: 2, high: 8}];
        
        this.sparkRangeValues = ko.observableArray(rangeValues);
    }
    
    var chartModel = new ChartModel();
    
    $(document).ready(
    function()
    {
      ko.applyBindings(chartModel, document.getElementById('sparkChart-container'));
    }
    );
});

var LineChart2 = (<div id='sparkChart-container'>
    <div style="float:left;line-height:60px;width:120px;font-weight:bold;padding-left:16px">
        Bar
    </div>
    <div title="Bar Spark Chart<br>First Value: 5<br>Last Value: 2<br>Low Value: 0<br>High Value: 9" data-bind="ojComponent: {
            component: 'ojSparkChart', 
            type: 'bar', 
            color: barColor,
            items: sparkValues
        }" 
         style="max-width:160px;width:100%;height:40px;float:left;">
    </div>
    <br style="clear:left;"/>
    
    <div style="float:left;line-height:60px;width:120px;font-weight:bold;padding-left:16px">
        Range Bar
    </div>
    <div title="Range Bar Spark Chart<br>Average Value: 4.5<br>Average Float Value: 4.6" data-bind="ojComponent: {
            component: 'ojSparkChart', 
            type: 'bar', 
            color: rangeBarColor,
            items: sparkRangeValues
        }" 
         style="max-width:160px;width:100%;height:40px;float:left;">
    </div>
    <br style="clear:left;"/>
    
    <div style="float:left;line-height:60px;width:120px;font-weight:bold;padding-left:16px">
        Line
    </div>
    <div title="Line Spark Chart<br>First Value: 5<br>Last Value: 2<br>Low Value: 0<br>High Value: 9" data-bind="ojComponent: {
            component: 'ojSparkChart', 
            type: 'line', 
            color: lineColor,
            items: sparkValues,
            lineWidth: 2
        }" 
         style="max-width:160px;width:100%;height:40px;float:left;">
    </div>
    <br style="clear:left;"/>
    
    <div style="float:left;line-height:60px;width:120px;font-weight:bold;padding-left:16px">
        Line with Area
    </div>
    <div title="Line Spark Chart<br>First Value: 5<br>Last Value: 2<br>Low Value: 0<br>High Value: 9" data-bind="ojComponent: {
            component: 'ojSparkChart', 
            type: 'lineWithArea', 
            color: lineWithAreaColor,
            items: sparkValues,
            lineType: 'curved'
        }" 
         style="max-width:160px;width:100%;height:40px;float:left;">
    </div>
    <br style="clear:left;"/>
    
    <div style="float:left;line-height:60px;width:120px;font-weight:bold;padding-left:16px">
        Area
    </div>
    <div title="Area Spark Chart<br>First Value: 5<br>Last Value: 2<br>Low Value: 0<br>High Value: 9" data-bind="ojComponent: {
            component: 'ojSparkChart', 
            type: 'area', 
            color: areaColor,
            items: sparkValues
        }" 
         style="max-width:160px;width:100%;height:40px;float:left;">
    </div>
    <br style="clear:left;"/>
    
    <div style="float:left;line-height:60px;width:120px;font-weight:bold;padding-left:16px">
        Range Area
    </div>
    <div title="Area Spark Chart<br>First Value: 5<br>Last Value: 2<br>Low Value: 0<br>High Value: 9" data-bind="ojComponent: {
            component: 'ojSparkChart', 
            type: 'area', 
            color: rangeAreaColor,
            items: sparkRangeValues
        }" 
         style="max-width:160px;width:100%;height:40px;float:left;">
    </div>
    <br style="clear:left;"/>   
</div>);

export default LineChart2;