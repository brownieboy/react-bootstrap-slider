/* eslint-env browser */

import React, { Fragment, lazy, Suspense } from "react";
import PropTypes from "prop-types";

// Importing from above the /src folder will cause CRA to treat the files differently, in
// that they are assumed to be transpiled already.  By creating a symlink to the higher
// folder we can trick it into thinking the file is with the /src folder.
// import ReactBootstrapSlider from "../../../src/react-bootstrap-slider.js";
// import ReactBootstrapSlider from "../../../dist/react-bootstrap-slider.js";

// import ReactBootstrapSlider from "./react-bootstrap-slider.js";

let ReactBootstrapSlider;
if (process.env.NODE_ENV === "production") {
  // Dist version, directly from parent folder so don't forget to run build in root folder first!
  console.log("Lady loading production react-bootstrap-loader...");
  ReactBootstrapSlider = lazy(() =>
    import("../../../dist/react-bootstrap-slider.js")
  );
} else {
  // Symlinked from parent folder.
  console.log("lazy loading dev (symlinked) react-bootstrap-loader...");
  ReactBootstrapSlider = lazy(() => import("./react-bootstrap-slider-symlink.js"));
}

// const ReactBootstrapSlider = lazy(() =>
//   import("./react-bootstrap-slider.js")
// );

// const Recipe = lazy(() =>import(`./docs/app/Recipes/${props.componentName}`));

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
        <Suspense fallback={<div>Fetching component...</div>}>
          <ReactBootstrapSlider
            {...this.state}
            value={this.state.currentValue}
            change={this.changeValue}
          />
        </Suspense>
      );
      valueSpan = <DemoMultiValueSpan id={id} value={newValue} />;
    } else {
      sliderControl = (
        <Suspense fallback={<div>Fetching component...</div>}>
          <ReactBootstrapSlider
            {...this.state}
            value={this.state.currentValue}
            slideStop={this.changeValue}
          />
        </Suspense>
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
