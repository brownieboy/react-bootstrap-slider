(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "bootstrap-slider"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("bootstrap-slider"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.bootstrapSlider);
    global.reactBootstrapSlider = mod.exports;
  }
})(this, function (_exports, _react, _propTypes, _bootstrapSlider) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.ReactBootstrapSlider = void 0;
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _bootstrapSlider = _interopRequireDefault(_bootstrapSlider);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class ReactBootstrapSlider extends _react.default.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "checkAndDoDisabled", () => {
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
      });

      _defineProperty(this, "updateSliderValues", () => {
        if (typeof this.props.min !== "undefined" && (typeof this.mySlider.min !== "undefined" || typeof this.mySlider.options.min !== "undefined")) {
          this.mySlider.setAttribute("min", this.props.min);
        }

        if (typeof this.props.max !== "undefined" && (typeof this.mySlider.max !== "undefined" || typeof this.mySlider.options.max !== "undefined")) {
          this.mySlider.setAttribute("max", this.props.max);
        }

        if (typeof this.props.step !== "undefined" && (typeof this.mySlider.step !== "undefined" || typeof this.mySlider.options.step !== "undefined")) {
          this.mySlider.setAttribute("step", this.props.step);
        }

        this.mySlider.setValue(this.props.value);
        this.checkAndDoDisabled();
      });
    }

    componentDidMount() {
      const that = this;
      const sliderAttributes = { ...this.props,
        tooltip: this.props.tooltip || "show"
      }; // console.log("sliderAttributes = " + JSON.stringify(sliderAttributes, null, 4));

      this.mySlider = new _bootstrapSlider.default(this.node, sliderAttributes); //     this.updateSliderValues();

      if (this.props.change || this.props.handleChange) {
        const changeEvent = this.props.change || this.props.handleChange;
        this.mySlider.on("change", e => {
          const fakeEvent = {
            target: {
              value: e.newValue
            }
          };
          changeEvent(fakeEvent);
        });
      }

      if (this.props.slideStop) {
        this.mySlider.on("slideStop", e => {
          const fakeEvent = {
            target: {
              value: e
            }
          };
          that.props.slideStop(fakeEvent);
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

    render() {
      // The slider"s an input.  That"s all we need.  We"ll do the rest in
      // the componentDidMount() method.
      return _react.default.createElement("div", {
        ref: node => this.node = node
      });
    }

  }

  _exports.ReactBootstrapSlider = ReactBootstrapSlider;
  ReactBootstrapSlider.propTypes = {
    min: _propTypes.default.number,
    max: _propTypes.default.number,
    step: _propTypes.default.number,
    value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number.isRequired).isRequired]).isRequired,
    disabled: _propTypes.default.string,
    tooltip: _propTypes.default.string,
    change: _propTypes.default.func,
    handleChange: _propTypes.default.func,
    slideStop: _propTypes.default.func,
    labelledby: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)])
  };
  var _default = ReactBootstrapSlider;
  _exports.default = _default;
});
