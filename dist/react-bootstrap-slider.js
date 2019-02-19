import _objectSpread from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/inherits";

/* eslint-env browser */
import React from "react";
import Slider from "bootstrap-slider";
export var ReactBootstrapSlider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactBootstrapSlider, _React$Component);

  function ReactBootstrapSlider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ReactBootstrapSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReactBootstrapSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.checkAndDoDisabled = function () {
      var sliderEnable = _this.props.disabled !== "disabled";

      var currentlyEnabled = _this.mySlider.isEnabled();

      if (sliderEnable) {
        if (!currentlyEnabled) {
          _this.mySlider.enable();
        }
      } else {
        if (currentlyEnabled) {
          _this.mySlider.disable();
        }
      }
    };

    _this.updateSliderValues = function () {
      if (typeof _this.props.min !== "undefined" && (typeof _this.mySlider.min !== "undefined" || typeof _this.mySlider.options.min !== "undefined")) {
        _this.mySlider.setAttribute("min", _this.props.min);
      }

      if (typeof _this.props.max !== "undefined" && (typeof _this.mySlider.max !== "undefined" || typeof _this.mySlider.options.max !== "undefined")) {
        _this.mySlider.setAttribute("max", _this.props.max);
      }

      if (typeof _this.props.step !== "undefined" && (typeof _this.mySlider.step !== "undefined" || typeof _this.mySlider.options.step !== "undefined")) {
        _this.mySlider.setAttribute("step", _this.props.step);
      }

      _this.mySlider.setValue(_this.props.value);

      _this.checkAndDoDisabled();
    };

    return _this;
  }

  _createClass(ReactBootstrapSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;

      var sliderAttributes = _objectSpread({}, this.props, {
        tooltip: this.props.tooltip || "show"
      }); // console.log("sliderAttributes = " + JSON.stringify(sliderAttributes, null, 4));


      this.mySlider = new Slider(this.node, sliderAttributes); //     this.updateSliderValues();

      if (this.props.change || this.props.handleChange) {
        var changeEvent = this.props.change || this.props.handleChange;
        this.mySlider.on("change", function (e) {
          var fakeEvent = {
            target: {
              value: e.newValue
            }
          };
          changeEvent(fakeEvent);
        });
      }

      if (this.props.slideStop) {
        this.mySlider.on("slideStop", function (e) {
          var fakeEvent = {
            target: {
              value: e
            }
          };
          that.props.slideStop(fakeEvent);
        });
      }

      this.checkAndDoDisabled();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateSliderValues();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mySlider.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // The slider"s an input.  That"s all we need.  We"ll do the rest in
      // the componentDidMount() method.
      return React.createElement("div", {
        ref: function ref(node) {
          return _this2.node = node;
        }
      });
    }
  }]);

  return ReactBootstrapSlider;
}(React.Component);
export default ReactBootstrapSlider;
