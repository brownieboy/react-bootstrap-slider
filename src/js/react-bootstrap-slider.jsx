/* eslint-env browser */

import React from "react";
import ReactDOM from "react-dom";
import Slider from "bootstrap-slider";
import es6BindAll from "es6bindall";
import { isPropNumberOrArray } from "./customproptypes.js";


export class ReactBootstrapSlider extends React.Component {
    constructor(props) {
        super(props);
        es6BindAll(this, ["updateSliderValues"]);
    }
    render() {
        // The slider"s an input.  That"s all we need.  We"ll do the rest in
        // the componentDidMount() method.
        return <input />;
    }

    componentDidMount() {
        var that = this;
        var sliderAttributes = {
            ...this.props,
            "tooltip": this.props.tooltip || "show"
        };

        this.mySlider = new Slider(ReactDOM.findDOMNode(this), sliderAttributes);

        this.updateSliderValues();
        if (this.props.change || this.props.handleChange) {
            var changeEvent = this.props.change || this.props.handleChange;
            this.mySlider.on("change", function(e) {
                var fakeEvent = {
                    target: {}
                };
                // fakeEvent.target.value = e;
                fakeEvent.target.value = e.newValue;
                changeEvent(fakeEvent);
            });
        }

        if (this.props.slideStop) {
            this.mySlider.on("slideStop", function(e) {
                var fakeEvent = {
                    target: {}
                };
                // fakeEvent.target.value = e;
                fakeEvent.target.value = e;
                that.props.slideStop(fakeEvent);
            });
        }


    }
    componentDidUpdate() {
        this.updateSliderValues();
    }
    updateSliderValues() {
        if (this.mySlider.min) {
            this.mySlider.setAttribute("min", this.props.min);
        }
        if (this.mySlider.max) {
            this.mySlider.setAttribute("max", this.props.max);
        }
        if (this.mySlider.step) {
            this.mySlider.setAttribute("step", this.props.step);
        }
        this.mySlider.setValue(this.props.value);

        var sliderEnable = this.props.disabled === "disabled" ? false : true;
        var currentlyEnabled = this.mySlider.isEnabled();
        if (sliderEnable) {
            if (!currentlyEnabled) {
                this.mySlider.enable();
            }
        } else {
            if (currentlyEnabled) {
                this.mySlider.disable();
            }
        }
    }
}

ReactBootstrapSlider.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: isPropNumberOrArray,
    disabled: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    change: React.PropTypes.func,
    handleChange: React.PropTypes.func,
    slideStop: React.PropTypes.func
};


export default ReactBootstrapSlider;
