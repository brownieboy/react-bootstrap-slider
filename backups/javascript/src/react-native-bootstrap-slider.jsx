var SliderNative = React.createClass({
    // Front end to the HTML5 native slider, i.e <input type="range">
    render: function () {
        return (
            <input id="mySlider"
                type="range"
                value={this.props.value}
                min={this.props.min}
                max={this.props.max}
                onInput={this.props.handleChange}
                onChange={this.handleOnChange}
                step={this.props.step} />
        );
    },
    handleOnChange: function () {
        // Nothing to do here.  Only present to prevent reactjs warning
        // about onChange not being present
    }
});

var BootstrapSlider = React.createClass({
    // Bootstrap-slider.js from https://github.com/seiyria/bootstrap-slider
    render: function () {
        // The slider's an input.  That's all we need.  We'll do the rest in JS.
        return (
                <input />
            );
    },
    componentDidMount: function () {
        var that = this;
        $.fn.bootstrapSlider = $.fn.bootstrapSlider || $.fn.slider;
        this.mySlider = $(this.getDOMNode()).bootstrapSlider({
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
    },
    componentDidUpdate: function() {
        this.updateSliderValues();
    },
    updateSliderValues: function() {
        $(this.mySlider)
            .bootstrapSlider("setAttribute", "min", this.props.min)
            .bootstrapSlider("setAttribute", "max", this.props.max)
            .bootstrapSlider("setAttribute", "step", this.props.step)
            .bootstrapSlider("setValue", this.props.value);

        var sliderEnable = this.props.disabled === "disabled" ? false : true;
        var currentlyEnabled = $(this.mySlider).bootstrapSlider("isEnabled");
        if(sliderEnable) {
            if(!currentlyEnabled) {
                $(this.mySlider).bootstrapSlider("enable");
            }
        }
        else {
            if(currentlyEnabled) {
                $(this.mySlider).bootstrapSlider("disable");
            }
        }
    }
});


var SliderNativeBootstrap = React.createClass({
    mixins: [BrowserDetectMixin],
    componentWillMount: function () {
        // Although IE10+ displays the native range control,it:
        //      a) looks crap
        //      b) doesn't respond to its Input or Change events properly.
        // So have augmented a feature test with some good, old-fashioned
        // browser sniffing to always display the Bootstrap version on IE.
        var ieVersion = this.detectIE();
        if (ieVersion > 1 && ieVersion < 12) {
                // IE up to version 11
                this.supportsRange = false;
        }
        else {
            // IE 12+ and all other browsers
            // Test whether range input is accepted by creating such a field, then seeing what its
            // type is set to.
            var input = document.createElement('input');
            input.setAttribute('type', 'range');
            this.supportsRange = input.type !== "text" ? true : false;        
        }

        
    },
    render: function () {
        var polyfill = typeof this.props.polyfill == "undefined" ? true : this.props.polyfill;
        if(polyfill) {
            if(this.supportsRange) {
                return (
                    <SliderNative {...this.props} />
                );
            }
            else {
                return (
                    <BootstrapSlider {...this.props} />
                );
            }
        }
        else {
            return (
                <BootstrapSlider {...this.props} />
            );            
        }
    }
});
