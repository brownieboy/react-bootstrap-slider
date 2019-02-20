"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/objectSpread", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/classCallCheck", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/createClass", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/getPrototypeOf", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/assertThisInitialized", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/inherits", "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/defineProperty", "react", "bootstrap-slider"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/objectSpread"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/classCallCheck"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/createClass"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/inherits"), require("/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/defineProperty"), require("react"), require("bootstrap-slider"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectSpread, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.assertThisInitialized, global.inherits, global.defineProperty, global.react, global.bootstrapSlider);
    global.undefined = mod.exports;
  }
})(void 0, function (exports, _objectSpread2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf3, _assertThisInitialized2, _inherits2, _defineProperty2, _react, _bootstrapSlider) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ReactBootstrapSlider = undefined;

  var _objectSpread3 = _interopRequireDefault(_objectSpread2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _getPrototypeOf4 = _interopRequireDefault(_getPrototypeOf3);

  var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _react2 = _interopRequireDefault(_react);

  var _bootstrapSlider2 = _interopRequireDefault(_bootstrapSlider);

  import _interopRequireDefault from "/home/brownieboy/Development/react-bootstrap-slider/node_modules/@babel/runtime/helpers/esm/interopRequireDefault";

  var ReactBootstrapSlider = exports.ReactBootstrapSlider = function (_React$Component) {
    (0, _inherits3.default)(ReactBootstrapSlider, _React$Component);

    function ReactBootstrapSlider() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck3.default)(this, ReactBootstrapSlider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn3.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(ReactBootstrapSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "checkAndDoDisabled", function () {
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
      (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "updateSliderValues", function () {
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

    (0, _createClass3.default)(ReactBootstrapSlider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var that = this;
        var sliderAttributes = (0, _objectSpread3.default)({}, this.props, {
          tooltip: this.props.tooltip || "show"
        }); // console.log("sliderAttributes = " + JSON.stringify(sliderAttributes, null, 4));

        this.mySlider = new _bootstrapSlider2.default(this.node, sliderAttributes); //     this.updateSliderValues();

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
        return _react2.default.createElement("div", {
          ref: function ref(node) {
            return _this2.node = node;
          }
        });
      }
    }]);
    return ReactBootstrapSlider;
  }(_react2.default.Component);

  exports.default = ReactBootstrapSlider;
});
