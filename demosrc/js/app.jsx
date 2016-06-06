/* eslint-env browser */

import React from "react";
import ReactDOM from "react-dom";
import es6BindAll from "es6bindall";
import ReactBootstrapSlider from "../../dist/react-bootstrap-slider.js";

const wrapperDivStyles = {
    "backgroundColor": "#E0E0E0",
    "padding": "20px",
    "width": "300px"
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            currentValue: props.startValue
        };
        delete this.state.startValue;
        es6BindAll(this, ["changeValue", "changeAxes"]);
    }
    changeValue(e) {
        this.setState({ currentValue: e.target.value });
    }
    changeAxes() {
        this.setState({
            currentValue: 500,
            min: 0,
            max: 2000,
            step: 100
        });
    }
    render() {
        var newValue = this.state.currentValue;
        return (
            <div>
                <div style={wrapperDivStyles}>
                   <ReactBootstrapSlider
                        { ...this.state }
                        value = { this.state.currentValue }
                        handleChange = { this.changeValue } />
                </div>
                 <br /> <br />
                Value: { newValue }
                <br /><br />
                <button onClick = { this.changeAxes } > Change axes </button>
            </div>
        );
    }

}

class DemoVertical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            currentValue: props.startValue
        };
        delete this.state.startValue;
        es6BindAll(this, ["changeValue", "changeAxes"]);
    }
    changeValue(e) {
        this.setState({ currentValue: e.target.value });
    }
    changeAxes() {
        this.setState({
            currentValue: 500,
            min: 0,
            max: 2000,
            step: 100
        });
    }
    render() {
        var newValue = this.state.currentValue;
        return (
            <div>
                <div style={wrapperDivStyles}>
                   <ReactBootstrapSlider
                        { ...this.state }
                        value = { this.state.currentValue }
                        handleChange = { this.changeValue }
                        orientation = "vertical" />
                </div>
                 <br /> <br />
                Value: { newValue }
                <br /><br />
                <button onClick = { this.changeAxes } > Change axes </button>
            </div>
        );
    }

}

ReactDOM.render(
    <div>
        <h3>Horizontal (default) demo</h3>
        <Demo startValue = { 3000 }
            max = { 20000 }
            min = { 1000 }
            step = { 1000 } />

        <h3>Vertical Demo</h3>
        <DemoVertical startValue = { 3000 }
            max = { 20000 }
            min = { 1000 }
            step = { 1000 } />
    </div>, document.getElementById("main"));

