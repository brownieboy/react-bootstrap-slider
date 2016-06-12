/* eslint-env browser */

import React from "react";
import ReactDOM from "react-dom";
import es6BindAll from "es6bindall";
import ReactBootstrapSlider from "./react-bootstrap-slider.jsx";

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
                        id="horizontalSlider"
                        value = { this.state.currentValue }
                        handleChange = { this.changeValue } />
                </div>
                 <br /> <br />
                Value: <span id="valueSpanHorizontal">{ newValue }</span>
                <br /><br />
                <button id = "butHorizontal" onClick = { this.changeAxes } > Change axes </button>
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
            currentValue: 700,
            min: 0,
            max: 2500,
            step: 500
        });
    }
    render() {
        var newValue = this.state.currentValue;
        return (
            <div>
                <div style={wrapperDivStyles}>
                   <ReactBootstrapSlider
                        { ...this.state }
                        id="verticalSlider"
                        value = { this.state.currentValue }
                        handleChange = { this.changeValue }
                        orientation = "vertical" />
                </div>
                 <br /> <br />
                Value: <span id="valueSpanVertical">{ newValue }</span>
                <br /><br />
                <button id="butVertical" onClick = { this.changeAxes } > Change axes </button>
            </div>
        );
    }

}

class DemoDual extends React.Component {
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
                        id="dualSlider"
                        range={ true }
                        value = { this.state.currentValue }
                        handleChange = { this.changeValue } />
                </div>
                 <br /> <br />
                Lower Value: <span id="valueSpanHorizontalLow">{ newValue[0] }</span><br />
                Upper Value: <span id="valueSpanHorizontalHigh">{ newValue[1] }</span>
                <br /><br />

                <button id = "butHorizontal" onClick = { this.changeAxes } > Change axes </button>
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
            step = { 1000 }
            reversed = { true } />

        <h3>Dual demo</h3>
        <DemoDual startValue = { [3000, 10000] }
            max = { 20000 }
            min = { 1000 }
            step = { 1000 } />

    </div>, document.getElementById("main"));

