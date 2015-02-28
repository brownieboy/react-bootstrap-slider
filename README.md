# react.slider.test

###Overview
A ReactJS wrapper for the HTML5 input type="range" slider component, but using [seiyria's Bootstrap Slider component] (https://github.com/seiyria/bootstrap-slider) as a polyfill where the HTML5 version is not available (IE 9) or is otherwise suffers from a problematic implementation (any other version of IE).


###Background
I like the HTML5 native range control, especially how easy it is manipulate via [ReactJS](http://facebook.github.io/react/), my current favourite JavaScript library.

```JavaScript
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
```