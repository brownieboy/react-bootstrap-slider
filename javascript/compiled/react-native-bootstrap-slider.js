var SliderNative = React.createClass({displayName: "SliderNative",
    // Front end to the HTML5 native slider, i.e <input type="range">
    render: function () {
        return (
            React.createElement("input", {id: "mySlider", 
                type: "range", 
                value: this.props.value, 
                min: this.props.min, 
                max: this.props.max, 
                onChange: this.props.handleChange, 
                step: this.props.step})
        );
    }
});

var BootstrapSlider = React.createClass({displayName: "BootstrapSlider",
    // Bootstrap-slider.js from https://github.com/seiyria/bootstrap-slider
    render: function () {
        // The slider's an input.  That's all we need.  We'll do the rest in JS.
        return (
                React.createElement("input", null)
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
    }
});


var SliderNativeBootstrap = React.createClass({displayName: "SliderNativeBootstrap",
    componentWillMount: function () {
        // Test whether range input is accepted by creating such a field, then seeing what its
        // type is set to.  
        var input = document.createElement('input');
        input.setAttribute('type', 'range');
        this.supportsRange = input.type !== "text" ? true : false;
    },
    render: function () {
        var polyfill = typeof this.props.polyfill == "undefined" ? true : this.props.polyfill;
        if(polyfill) {
            if(this.supportsRange) {
                return (
                    React.createElement(SliderNative, React.__spread({},  this.props))
                );
            }
            else {
                return (
                    React.createElement(BootstrapSlider, React.__spread({},  this.props))
                );
            }
        }
        else {
            return (
                React.createElement(BootstrapSlider, React.__spread({},  this.props))
            );            
        }
    }
});
