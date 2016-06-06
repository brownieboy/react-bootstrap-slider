/* eslint-env browser */

import React from "react";
import ReactDOM from "react-dom";
import Slider from "bootstrap-slider";
import es6BindAll from "es6bindall";

export class ReactBootstrapSlider extends React.Component {
   constructor(props) {
      super(props);
      es6BindAll(this, ["updateSliderValues"]);
   }
   render() {
      // The slider"s an input.  That"s all we need.  We"ll do the rest in
      // the componentDidMount() method.
      return <input / >;
   }

   componentDidMount() {
      var that = this;
      var sliderAttributes = {
         ...this.props,
         "tooltip": this.props.tooltip || "show"
      };

      this.mySlider = new Slider(ReactDOM.findDOMNode(this), sliderAttributes);

      this.updateSliderValues();
      this.mySlider.on("change", function(e) {
         var fakeEvent = {
            target: {}
         };
         fakeEvent.target.value = e.newValue;
         that.props.handleChange(fakeEvent);
      });
   }
   componentDidUpdate() {
      this.updateSliderValues();
   }
   updateSliderValues() {
      this.mySlider.setAttribute("min", this.props.min);
      this.mySlider.setAttribute("max", this.props.max);
      this.mySlider.setAttribute("step", this.props.step);
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

export default ReactBootstrapSlider;
