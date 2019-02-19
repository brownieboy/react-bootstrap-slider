"use strict";

var _interopRequireDefault = require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReactBootstrapSlider = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/inherits"));

var _defineProperty2 = _interopRequireDefault(require("/Users/michaelbrown/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _bootstrapSlider = _interopRequireDefault(require("bootstrap-slider"));

/* eslint-env browser */
var ReactBootstrapSlider =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ReactBootstrapSlider, _React$Component);

  function ReactBootstrapSlider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ReactBootstrapSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ReactBootstrapSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "checkAndDoDisabled", function () {
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
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateSliderValues", function () {
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
    });
    return _this;
  }

  (0, _createClass2.default)(ReactBootstrapSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;
      var sliderAttributes = (0, _objectSpread2.default)({}, this.props, {
        tooltip: this.props.tooltip || "show"
      }); // console.log("sliderAttributes = " + JSON.stringify(sliderAttributes, null, 4));

      this.mySlider = new _bootstrapSlider.default(this.node, sliderAttributes); //     this.updateSliderValues();

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
      return _react.default.createElement("div", {
        ref: function ref(node) {
          return _this2.node = node;
        }
      });
    }
  }]);
  return ReactBootstrapSlider;
}(_react.default.Component);

exports.ReactBootstrapSlider = ReactBootstrapSlider;
var _default = ReactBootstrapSlider;
exports.default = _default;
