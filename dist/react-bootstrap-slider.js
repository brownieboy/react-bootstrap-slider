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
})(this, function (exports, _react, _propTypes, _bootstrapSlider) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReactBootstrapSlider = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _bootstrapSlider2 = _interopRequireDefault(_bootstrapSlider);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    // import { isPropNumberOrArray } from "./customproptypes.js";

    // Tests to see if prop is a number or an array.  Clunky, but will do for now.
    function isPropNumberOrArray(props, propName, componentName) {
        // console.log("props[" + propName + "]=" + props[propName]);
        if (!(typeof props[propName] === "number" || typeof props[propName] === "undefined" || Array.isArray(props[propName]))) {
            return new Error([componentName, "requires that", propName, "be a number or an array."].join(" "));
        }
    }

    var ReactBootstrapSlider = exports.ReactBootstrapSlider = function (_React$Component) {
        _inherits(ReactBootstrapSlider, _React$Component);

        function ReactBootstrapSlider(props) {
            _classCallCheck(this, ReactBootstrapSlider);

            var _this = _possibleConstructorReturn(this, (ReactBootstrapSlider.__proto__ || Object.getPrototypeOf(ReactBootstrapSlider)).call(this, props));

            _this.updateSliderValues = _this.updateSliderValues.bind(_this);
            return _this;
        }

        _createClass(ReactBootstrapSlider, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var that = this;
                var sliderAttributes = _extends({}, this.props, {
                    "tooltip": this.props.tooltip || "show"
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
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.updateSliderValues();
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
        slideStop: _propTypes2.default.func
    };

    exports.default = ReactBootstrapSlider;
});
