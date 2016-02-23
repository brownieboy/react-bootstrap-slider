# React Bootstrap Native Slider

###Overview
A ReactJS wrapper for the HTML5 input type="range" slider component, but using [seiyria's Bootstrap Slider component](https://github.com/seiyria/bootstrap-slider) as a polyfill where the HTML5 version is not available (IE 9) or otherwise suffers from a problematic implementation (any other version of IE).


###Background
I like the HTML5 native range control, especially how easy it is manipulate via [ReactJS](http://facebook.github.io/react/), my current favourite JavaScript library.

Here's how the native JavaScript control is rendered in my plug-in:

```JavaScript
    render: function () {
        return (
            <input id="mySlider"
                type="range"
                value={this.props.value}
                min={this.props.min}
                max={this.props.max}
                onInput={this.props.handleChange}
                step={this.props.step} />
        );
    }
```

It's about as simple a rendering as you could want in React.  You'd pass some props into your component, and render them as the corresponding attributes on the input field.


####Internet Explorer Problems
The HTML5 slider control has problems on internet explorer:
1.  It isn't supported on IE9
1.  It's poorly implmented visually on IE10 and above.  The part that you have to grap with your mouse, or finger on tablet, to actually slide the values is way too small, IMHO. (Check the **oninput in IE11** video on [this Impressive Webs article](http://www.impressivewebs.com/onchange-vs-oninput-for-range-sliders/) to see what I mean).

In the end, I made an executive decision in my React Bootstrap Slider component: I don't display the native HTML5 slider control on IE.



###How to use
Install from npm with:

    npm install --save react-bootstrap-native-slider

Require or import like so for ES6:

    import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

or like this for CommonJS:

    var reactNativeBootstrapSliderObj = require('./react-native-bootstrap-slider.jsx');
    var ReactNativeBootstrapSlider = reactNativeBootstrapSliderObj.ReactNativeBootstrapSlider;

The CommonJS syntax is a little more complicated because although CommonJS can handle a default export and named exports, unlike ES6 it cannot handle both at the same time.  Note: this CommonJS syntax is a breaking change from version 1.0.3; sorry about that.


The control is implmented in UMD format, so should also work for AMD/RequireJS, but I've not tested that.  You can also add it as a script tag.


Here's an example of how you might call it in your ReactJS's render method:

```JavaScript
<ReactSliderNativeBootstrap
    value={this.state.currentValue}
    handleChange={this.changeValue}
    step={this.state.step}
    max={this.state.max}
    min={this.state.min}
    disabled="disabled" />
    }
```

The **value**, **step**, **max** and **min** parameters should be self-explanatory.  handleChange is the callback method that will be called when the slider actually changes.  (NB: this is the onInput event for the native HTML5 control, and the "change" event for the Bootstrap slider.)

If the optional parameter **disabled** is included, and is set to "disabled", then the slider will display in a disabled state.  If the parameter is not included, or is set to anything else except "disabled", then the slider control will be enabled.


####Forcing the Bootstrap or Native version all the time
If you want to force the HTML5 native slider control all the time and never see the Bootstrap version, then you can use the module's named imports to import that actual class/function.  Here's how to do it in ES6:

    import ReactNativeSlider from 'react-bootstrap-native-slider';

Correspondingly, if you want to forcee the Bootstrap version all the time, then import _its_ module like so in ES6:

    import ReactBootstrapSlider from 'react-bootstrap-native-slider';

Here's how you would do the same using CommonJS:

    var reactNativeBootstrapSliderObj = require('./react-native-bootstrap-slider.jsx');
    var ReactNativeSlider = reactNativeBootstrapSliderObj.ReactNativeSlider;
    var ReactBootstrapSlider  = reactNativeBootstrapSliderObj.ReactBootstrapSlider;
    var ReactNativeBootstrapSlider = reactNativeBootstrapSliderObj.ReactNativeBootstrapSlider;


##Development
To develop, issue this command:

    npm run start

then point your browser to [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html).  You need to edit the code in the /src folder.  It will update in the browser automatically, courtesy via webpack-dev-server.

To build the distribution version, issue:

    npm run build

The build JavaScript file will go on the /dist folder as react-native-bootstrap-slider.js.  This is the main file for the project, which is used wheneve this the react-bootstrap-native-slider package is loaded from npm.

To build the demo, issue:

   npm run buildDemo

Wepback will build the JavaScript files for the demo in the /demo/js/ folder.  Your cord will go in the slider-bundle.min.js file.  Any 3rd-party code (jQuery, Bootstrap etc) goes into the vendor.min.js file.  Source maps are generated both.

###Demo
Is [here](http://users.on.net/~mikeandgeminoz/code/react.bootstrap.slidertest/index.html).

On load, the slider range is 1,000 to 20,000 with a step of 1,000.

Click on the **Change axes!** button, and the slider range changes from 0 to 2,000 with a step of 100.














