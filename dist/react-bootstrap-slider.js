(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "bootstrap-slider", "es6bindall"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("bootstrap-slider"), require("es6bindall"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.bootstrapSlider, global.es6bindall);
        global.reactBootstrapSlider = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _bootstrapSlider, _es6bindall) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReactBootstrapSlider = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _bootstrapSlider2 = _interopRequireDefault(_bootstrapSlider);

    var _es6bindall2 = _interopRequireDefault(_es6bindall);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var ReactBootstrapSlider = exports.ReactBootstrapSlider = function (_React$Component) {
        _inherits(ReactBootstrapSlider, _React$Component);

        function ReactBootstrapSlider(props) {
            _classCallCheck(this, ReactBootstrapSlider);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactBootstrapSlider).call(this, props));

            (0, _es6bindall2.default)(_this, ["updateSliderValues"]);
            return _this;
        }

        _createClass(ReactBootstrapSlider, [{
            key: "render",
            value: function render() {
                // The slider"s an input.  That"s all we need.  We"ll do the rest in
                // the componentDidMount() method.
                return _react2.default.createElement("input", null);
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var that = this;
                var sliderAttributes = {
                    "tooltip": this.props.tooltip || "show"
                };
                if (this.props.orientation) {
                    console.log("orientation = " + this.props.orientation);
                    sliderAttributes.orientation = this.props.orientation;
                }

                this.mySlider = new _bootstrapSlider2.default(_reactDom2.default.findDOMNode(this), sliderAttributes);

                this.updateSliderValues();
                this.mySlider.on("change", function (e) {
                    var fakeEvent = {
                        target: {}
                    };
                    fakeEvent.target.value = e.newValue;
                    that.props.handleChange(fakeEvent);
                });
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.updateSliderValues();
            }
        }, {
            key: "updateSliderValues",
            value: function updateSliderValues() {
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
        }]);

        return ReactBootstrapSlider;
    }(_react2.default.Component);

    exports.default = ReactBootstrapSlider;
});
