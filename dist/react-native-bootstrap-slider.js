(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'detect-browser', 'es6bindall', 'bootstrap-slider'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('detect-browser'), require('es6bindall'), require('bootstrap-slider'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.detectBrowser, global.es6bindall, global.bootstrapSlider);
        global.reactNativeBootstrapSlider = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _detectBrowser, _es6bindall) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReactNativeBootstrapSlider = exports.ReactBootstrapSlider = exports.ReactNativeSlider = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _detectBrowser2 = _interopRequireDefault(_detectBrowser);

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

    var ReactNativeSlider = exports.ReactNativeSlider = function (_React$Component) {
        _inherits(ReactNativeSlider, _React$Component);

        function ReactNativeSlider() {
            _classCallCheck(this, ReactNativeSlider);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactNativeSlider).apply(this, arguments));
        }

        _createClass(ReactNativeSlider, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement('input', { id: 'mySlider',
                    type: 'range',
                    value: this.props.value,
                    min: this.props.min,
                    max: this.props.max,
                    onInput: this.props.handleChange,
                    onChange: this.handleOnChange,
                    step: this.props.step,
                    className: 'react-native-slider' });
            }
        }, {
            key: 'handleOnChange',
            value: function handleOnChange() {
                // Nothing to do here.  Only present to prevent reactjs warning
                // about onChange not being present
            }
        }]);

        return ReactNativeSlider;
    }(_react2.default.Component);

    var ReactBootstrapSlider = exports.ReactBootstrapSlider = function (_React$Component2) {
        _inherits(ReactBootstrapSlider, _React$Component2);

        function ReactBootstrapSlider(props) {
            _classCallCheck(this, ReactBootstrapSlider);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactBootstrapSlider).call(this, props));

            (0, _es6bindall2.default)(_this2, ["updateSliderValues"]);
            return _this2;
        }

        _createClass(ReactBootstrapSlider, [{
            key: 'render',
            value: function render() {
                // The slider's an input.  That's all we need.  We'll do the rest in
                // the componentDidMount() method.
                return _react2.default.createElement('input', null);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var that = this;
                $.fn.bootstrapSlider = $.fn.bootstrapSlider || $.fn.slider;
                this.mySlider = $(_reactDom2.default.findDOMNode(this)).bootstrapSlider({
                    "tooltip": this.props.tooltip || "show"
                });
                this.updateSliderValues();
                this.mySlider.on("change", function (e) {
                    var fakeEvent = {
                        target: {}
                    };
                    fakeEvent.target.value = e.value.newValue;
                    that.props.handleChange(fakeEvent);
                });
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.updateSliderValues();
            }
        }, {
            key: 'updateSliderValues',
            value: function updateSliderValues() {
                $(this.mySlider).bootstrapSlider("setAttribute", "min", this.props.min).bootstrapSlider("setAttribute", "max", this.props.max).bootstrapSlider("setAttribute", "step", this.props.step).bootstrapSlider("setValue", this.props.value);

                var sliderEnable = this.props.disabled === "disabled" ? false : true;
                var currentlyEnabled = $(this.mySlider).bootstrapSlider("isEnabled");
                if (sliderEnable) {
                    if (!currentlyEnabled) {
                        $(this.mySlider).bootstrapSlider("enable");
                    }
                } else {
                    if (currentlyEnabled) {
                        $(this.mySlider).bootstrapSlider("disable");
                    }
                }
            }
        }]);

        return ReactBootstrapSlider;
    }(_react2.default.Component);

    var ReactNativeBootstrapSlider = exports.ReactNativeBootstrapSlider = function (_React$Component3) {
        _inherits(ReactNativeBootstrapSlider, _React$Component3);

        function ReactNativeBootstrapSlider() {
            _classCallCheck(this, ReactNativeBootstrapSlider);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactNativeBootstrapSlider).apply(this, arguments));
        }

        _createClass(ReactNativeBootstrapSlider, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                // Although IE10+ displays the native range control,it:
                //      a) looks crap
                //      b) doesn't respond to its Input or Change events properly.
                // So have augmented a feature test with some good, old-fashioned
                // browser sniffing to always display the Bootstrap version on IE.
                var browserVersion = parseInt(_detectBrowser2.default.version, 10);
                // if (browser.name === "ie" && (browserVersion > 9 && browserVersion < 12)) {
                if (_detectBrowser2.default.name === "ie" || _detectBrowser2.default.name === "edge") {
                    // IE all versions.  Note: previous versions of this  module used to display
                    // the native control on IE 12/Edge, but it actually looks crap there too.
                    this.supportsRange = false;
                } else {
                    // All other browsers except IE.
                    // Test whether range input is accepted by creating such a field, then seeing what its
                    // type is set to.
                    var input = document.createElement('input');
                    input.setAttribute('type', 'range');
                    this.supportsRange = input.type !== "text" ? true : false;
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var polyfill = typeof this.props.polyfill == "undefined" ? true : this.props.polyfill;
                if (polyfill && this.supportsRange) {
                    return _react2.default.createElement(ReactNativeSlider, this.props);
                } else {
                    return _react2.default.createElement(ReactBootstrapSlider, this.props);
                }
            }
        }]);

        return ReactNativeBootstrapSlider;
    }(_react2.default.Component);

    exports.default = ReactNativeBootstrapSlider;
});
