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
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _react, _propTypes, _bootstrapSlider) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.ReactBootstrapSlider = void 0;
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _bootstrapSlider = _interopRequireDefault(_bootstrapSlider);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var ReactBootstrapSlider =
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

      _defineProperty(_assertThisInitialized(_this), "checkAndDoDisabled", function () {
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

      _defineProperty(_assertThisInitialized(_this), "updateSliderValues", function () {
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

    _createClass(ReactBootstrapSlider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var that = this;

        var sliderAttributes = _objectSpread({}, this.props, {
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
