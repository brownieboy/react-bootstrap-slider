/** @jsx React.DOM */
/* jshint browser: true */
/* globals React, ReactSlider, console */



var Demo = React.createClass({displayName: "Demo",
    getInitialState: function (){
        return {
            currentValue: this.props.startValue,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step
        };
    },
    render: function() {
        var newValue = this.state.currentValue;
        // TODO: Replace this with bootstrap version
        return (
            React.createElement("div", null, 
                React.createElement(SliderNativeBootstrap, {
                    value: this.state.currentValue, 
                    handleChange: this.changeValue, 
                    step: this.state.step, 
                    max: this.state.max, 
                    min: this.state.min}), 
                React.createElement("br", null), React.createElement("br", null), 
                "Value: ", newValue, 

                React.createElement("br", null), React.createElement("br", null), 
                React.createElement("button", {onClick: this.changeAxes}, "Change axes!")
            )
            );
    },
    changeValue: function(e) {
        console.log("changeValue");
        this.setState({currentValue: e.target.value});
    },
    changeAxes: function (){
        this.setState({
            currentValue: 500,
            min: 0,
            max: 2000,
            step: 100
        });
    }
});

React.render(React.createElement(Demo, {
        startValue: 3000, 
        max: 20000, 
        min: 1000, 
        step: 1000}), document.getElementById("main"));
