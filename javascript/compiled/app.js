/** @jsx React.DOM */
/* jshint browser: true */
/* globals React, ReactSlider, console */


var SliderNative = React.createClass({displayName: "SliderNative",
    render: function () {
        return (
            React.createElement("input", {id: "mySlider", 
                type: "range", 
                value: this.props.value, 
                min: this.props.min, 
                max: this.props.max, 
                onChange: this.props.handleChange, 
                step: this.props.step})
        );
    }
});

var BootstrapSlider = React.createClass({displayName: "BootstrapSlider",
    render: function () {
        return (
                React.createElement("input", {id: "mySlider", 
                    type: "range", 
                    "data-slider-value": this.props.value, 
                    "data-slider-min": this.props.min, 
                    "data-slider-max": this.props.max, 
                    "data-slider-step": this.props.step})
            );
    },
    componentDidMount: function () {
        var that = this;
        var mySlider = $(this.getDOMNode()).slider().on("change", function (e) {
            var fakeEvent = {
                target: {}
            };
            fakeEvent.target.value = e.value.newValue;
            that.props.handleChange(fakeEvent);
        });
    }
});


var SliderNativeBootstrap = React.createClass({displayName: "SliderNativeBootstrap",
    componentWillMount: function () {
        // Test whether range input is accepted by creating one, then seeing what its
        // type is set to.  
        console.log("Writing supportsRange()");
        var input = document.createElement('input');
        input.setAttribute('type', 'range');
        this.supportsRange = input.type !== "text" ? true : false;
    },
    render: function () {
        var polyfill = typeof this.props.polyfill == "undefined" ? true : this.props.polyfill;
        if(polyfill) {
            if(this.supportsRange) {
                return (
                    React.createElement(SliderNative, React.__spread({},  this.props))
                );
            }
            else {
                return (
                    React.createElement(BootstrapSlider, React.__spread({},  this.props))
                );
            }
        }
        else {
            return (
                React.createElement(BootstrapSlider, React.__spread({},  this.props))
            );            
        }
    }
});




/**********************************************************************************/


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
        console.log("Demo.render(). this.state.currentValue = " + this.state.currentValue);
        var newValue = this.state.currentValue;
        // TODO: Replace this with bootstrap version
        return (
            React.createElement("div", null, 
                React.createElement(SliderNativeBootstrap, {
                    polyfill: false, 
                    value: this.state.currentValue, 
                    handleChange: this.changeValue, 
                    step: this.state.step, 
                    max: this.state.max, 
                    min: this.state.min}), 
                React.createElement("br", null), React.createElement("br", null), 
                "Value: ", newValue, 

                React.createElement("br", null), React.createElement("br", null), 
                React.createElement("button", {onClick: this.changeAll}, "Change all!")
            )
            );
    },
    changeValue: function(e) {
        console.log("value = " + e.target.value);
        this.setState({currentValue: e.target.value});
    },
    changeAll: function (){
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
