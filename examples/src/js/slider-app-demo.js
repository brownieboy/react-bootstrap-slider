/* eslint-env browser */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ReactBootstrapSlider from "../../../src/react-bootstrap-slider.js";

console.log("process.env:");
console.log(process.env);
// console.log("In Demo, my var: " + process.env.NODE_USE_PROD_PACKAGE);


const DemoSingleValueSpan = ({ id, value }) => (
  <div className="demoValueDisplay">
    Value: <span id={`valueSpan${id}`}>{value}</span>
  </div>
);

DemoSingleValueSpan.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

const DemoMultiValueSpan = ({ id, value }) => (
  <div>
    <div className="demoValueDisplay">
      Lower Value: <span id={`valueSpan${id}Low`}>{value[0]}</span>
    </div>
    <div className="demoValueDisplay">
      Upper Value: <span id={`valueSpan${id}High`}>{value[1]}</span>
    </div>
    <br />
  </div>
);

DemoMultiValueSpan.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      currentValue: props.startValue
    };
  }

  changeValue = e => {
    // console.log("changeValue triggered");
    this.setState({ currentValue: e.target.value });
  };

  changeAxes = () => {
    this.setState({
      currentValue: 500,
      min: 0,
      max: 2000,
      step: 100
    });
  };

  render() {
    const newValue = this.state.currentValue;
    const { changeAxesEnabled, id } = this.props;
    let sliderControl, valueSpan, changeAxesButton;
    if (Array.isArray(newValue)) {
      sliderControl = (
        <ReactBootstrapSlider
          {...this.state}
          value={this.state.currentValue}
          change={this.changeValue}
        />
      );
      valueSpan = <DemoMultiValueSpan id={id} value={newValue} />;
    } else {
      sliderControl = (
        <ReactBootstrapSlider
          {...this.state}
          value={this.state.currentValue}
          slideStop={this.changeValue}
        />
      );
      valueSpan = <DemoSingleValueSpan id={id} value={newValue} />;
      changeAxesButton = changeAxesEnabled && (
        <button
          id={`but${id}`}
          onClick={this.changeAxes}
          className="demoAxesButtonDisplay"
        >
          Change axes
        </button>
      );
    }
    return (
      <Fragment>
        <div className="demoWrapperDivStyles">{sliderControl}</div>
        {valueSpan}
        {changeAxesButton}
      </Fragment>
    );
  }
}

Demo.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ]),
  startValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ]),
  changeAxesEnabled: PropTypes.bool
};

const SliderAppDemo = () => (
  <div className="demoOuterWrapper">
    <div className="demoWrapper">
      <h3>Horizontal (default) demo</h3>
      <Demo
        id="horizontalSlider"
        name="horizontalSliderName"
        startValue={3000}
        max={20000}
        min={1000}
        step={1000}
        tooltip="always"
        changeAxesEnabled={true}
      />
    </div>
    <div className="demoWrapper">
      <h3>Vertical Demo</h3>
      <Demo
        startValue={3000}
        id="verticalSlider"
        orientation="vertical"
        max={20000}
        min={1000}
        step={1000}
        reversed={true}
        changeAxesEnabled={true}
      />
    </div>
    <div className="demoWrapper">
      <h3>Dual demo</h3>
      <Demo
        startValue={[3000, 10000]}
        range={true}
        id="dualSlider"
        max={20000}
        min={1000}
        step={1000}
      />
    </div>
    <div className="demoWrapper">
      <h3>Ticks Demo</h3>
      <Demo
        id="ticksSlider"
        startValue={200}
        ticks={[0, 100, 200, 300, 400]}
        ticks_positions={[0, 25, 50, 75, 100]}
        ticks_labels={["$0", "$100", "$200", "$300", "$400"]}
        ticks_snap_bounds={30}
      />
    </div>
    <div className="demoWrapper">
      <h3>Range Highlights demo</h3>
      <Demo
        id="rangeHighlightsSlider"
        startValue={3000}
        max={20000}
        min={1000}
        step={1000}
        rangeHighlights={[
          { start: 1000, end: 5000 },
          { start: 12000, end: 17000 }
        ]}
      />
    </div>
    <div className="demoWrapper">
      <h3>Disabled demo</h3>
      <Demo
        id="disabledSlider"
        name="disabledSliderName"
        startValue={3000}
        max={20000}
        min={1000}
        step={1000}
        disabled="disabled"
        tooltip="always"
      />
    </div>
    <div className="demoWrapper">
      <h3>Everything starts at zero demo</h3>
      The min, max and step props are all zero, so effectively disabled at
      first.
      <Demo
        id="startZeroSlider"
        name="startZeroSliderName"
        startValue={0}
        max={0}
        min={0}
        step={0}
        tooltip="always"
        changeAxesEnabled={true}
      />
    </div>
  </div>
);

export default SliderAppDemo;
