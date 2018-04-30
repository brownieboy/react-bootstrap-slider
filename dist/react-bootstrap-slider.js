(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "babel-runtime/helpers/extends", "babel-runtime/helpers/classCallCheck", "babel-runtime/helpers/createClass", "babel-runtime/helpers/possibleConstructorReturn", "babel-runtime/helpers/inherits", "react", "prop-types", "bootstrap-slider"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("babel-runtime/helpers/extends"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/createClass"), require("babel-runtime/helpers/possibleConstructorReturn"), require("babel-runtime/helpers/inherits"), require("react"), require("prop-types"), require("bootstrap-slider"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._extends, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.react, global.propTypes, global.bootstrapSlider);
        global.reactBootstrapSlider = mod.exports;
    }
})(this, function (exports, _extends2, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _react, _propTypes, _bootstrapSlider) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReactBootstrapSlider = undefined;

    var _extends3 = _interopRequireDefault(_extends2);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

    var _inherits3 = _interopRequireDefault(_inherits2);

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _bootstrapSlider2 = _interopRequireDefault(_bootstrapSlider);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // import { isPropNumberOrArray } from "./customproptypes.js";

    // Tests to see if prop is a number or an array.  Clunky, but will do for now.
    function isPropNumberOrArray(props, propName, componentName) {
        // console.log("props[" + propName + "]=" + props[propName]);
        if (!(typeof props[propName] === "number" || typeof props[propName] === "undefined" || Array.isArray(props[propName]))) {
            return new Error([componentName, "requires that", propName, "be a number or an array."].join(" "));
        }
    } /* eslint-env browser */

    var ReactBootstrapSlider = exports.ReactBootstrapSlider = function (_React$Component) {
        (0, _inherits3.default)(ReactBootstrapSlider, _React$Component);

        function ReactBootstrapSlider(props) {
            (0, _classCallCheck3.default)(this, ReactBootstrapSlider);

            var _this = (0, _possibleConstructorReturn3.default)(this, (ReactBootstrapSlider.__proto__ || Object.getPrototypeOf(ReactBootstrapSlider)).call(this, props));

            _this.updateSliderValues = _this.updateSliderValues.bind(_this);
            _this.checkAndDoDisabled = _this.checkAndDoDisabled.bind(_this);
            return _this;
        }

        (0, _createClass3.default)(ReactBootstrapSlider, [{
            key: "checkAndDoDisabled",
            value: function checkAndDoDisabled() {
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
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var that = this;
                var sliderAttributes = (0, _extends3.default)({}, this.props, {
                    tooltip: this.props.tooltip || "show"
                });
                // console.log("sliderAttributes = " + JSON.stringify(sliderAttributes, null, 4));

                this.mySlider = new _bootstrapSlider2.default(this.node, sliderAttributes);

                //     this.updateSliderValues();
                if (this.props.change || this.props.handleChange) {
                    var changeEvent = this.props.change || this.props.handleChange;
                    this.mySlider.on("change", function (e) {
                        var fakeEvent = {
                            target: {}
                        };
                        fakeEvent.target.value = e.newValue;
                        changeEvent(fakeEvent);
                    });
                }

                if (this.props.slideStop) {
                    this.mySlider.on("slideStop", function (e) {
                        var fakeEvent = {
                            target: {}
                        };
                        fakeEvent.target.value = e;
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
            key: "updateSliderValues",
            value: function updateSliderValues() {
                if (this.props.min && (this.mySlider.min || this.mySlider.options.min)) {
                    this.mySlider.setAttribute("min", this.props.min);
                }
                if (this.props.max && (this.mySlider.max || this.mySlider.options.max)) {
                    this.mySlider.setAttribute("max", this.props.max);
                }
                if (this.props.step && (this.mySlider.step || this.mySlider.options.step)) {
                    this.mySlider.setAttribute("step", this.props.step);
                }

                this.mySlider.setValue(this.props.value);
                this.checkAndDoDisabled();
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                // The slider"s an input.  That"s all we need.  We"ll do the rest in
                // the componentDidMount() method.
                return _react2.default.createElement("div", { ref: function ref(node) {
                        return _this2.node = node;
                    } });
            }
        }]);
        return ReactBootstrapSlider;
    }(_react2.default.Component);

    ReactBootstrapSlider.propTypes = {
        min: _propTypes2.default.number,
        max: _propTypes2.default.number,
        step: _propTypes2.default.number,
        value: isPropNumberOrArray,
        disabled: _propTypes2.default.string,
        tooltip: _propTypes2.default.string,
        change: _propTypes2.default.func,
        handleChange: _propTypes2.default.func,
        slideStop: _propTypes2.default.func,
        labelledby: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)])
    };

    exports.default = ReactBootstrapSlider;
});
