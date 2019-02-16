/* eslint-env browser */

import React from "react";
import PropTypes from "prop-types";
import Slider from "bootstrap-slider";

export class ReactBootstrapSlider extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.updateSliderValues = this.updateSliderValues.bind(this);
  //   // this.checkAndDoDisabled = this.checkAndDoDisabled.bind(this);
  // }

  checkAndDoDisabled = () => {
    const sliderEnable = this.props.disabled !== "disabled";
    const currentlyEnabled = this.mySlider.isEnabled();
    if (sliderEnable) {
      if (!currentlyEnabled) {
        this.mySlider.enable();
      }
    } else {
      if (currentlyEnabled) {
        this.mySlider.disable();
      }
    }
  };

  componentDidMount() {
    // const that = this;
    const sliderAttributes = {
      ...this.props,
      tooltip: this.props.tooltip || "show"
    };
    // console.log("sliderAttributes = " + JSON.stringify(sliderAttributes, null, 4));

    this.mySlider = new Slider(this.node, sliderAttributes);

    const { change, handleChange, slideStop } = this.props;

    //     this.updateSliderValues();
    if (change || handleChange) {
      const changeEvent = change || handleChange;
      this.mySlider.on("change", e => {
        const fakeEvent = {
          target: {
            value: e.newValue
          }
        };
        // fakeEvent.target.value = e.newValue;
        changeEvent(fakeEvent);
      });
    }

    if (slideStop) {
      this.mySlider.on("slideStop", e => {
        const fakeEvent = {
          target: {
            value: e
          }
        };
        // fakeEvent.target.value = e;
        slideStop(fakeEvent);
      });
    }
    this.checkAndDoDisabled();
  }

  componentDidUpdate() {
    this.updateSliderValues();
  }

  componentWillUnmount() {
    this.mySlider.destroy();
  }

  updateSliderValues = () => {
    const { min, max } = this.props;
    if (
      typeof min !== "undefined" &&
      (typeof this.mySlider.min !== "undefined" ||
        typeof this.mySlider.options.min !== "undefined")
    ) {
      this.mySlider.setAttribute("min", min);
    }
    if (
      typeof max !== "undefined" &&
      (typeof this.mySlider.max !== "undefined" ||
        typeof this.mySlider.options.max !== "undefined")
    ) {
      this.mySlider.setAttribute("max", max);
    }
    if (
      typeof this.props.step !== "undefined" &&
      (typeof this.mySlider.step !== "undefined" ||
        typeof this.mySlider.options.step !== "undefined")
    ) {
      this.mySlider.setAttribute("step", this.props.step);
    }

    this.mySlider.setValue(this.props.value);
    this.checkAndDoDisabled();
  };

  render() {
    // The slider"s an input.  That"s all we need.  We"ll do the rest in
    // the componentDidMount() method.
    return <div ref={node => (this.node = node)} />;
  }
}

ReactBootstrapSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ]).isRequired,
  disabled: PropTypes.string,
  tooltip: PropTypes.string,
  change: PropTypes.func,
  handleChange: PropTypes.func,
  slideStop: PropTypes.func,
  labelledby: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default ReactBootstrapSlider;
