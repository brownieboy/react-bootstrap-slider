# React Bootstrap Slider

###Overview
A ReactJS wrapper [seiyria's Bootstrap Slider component](https://github.com/seiyria/bootstrap-slider)


###Background
Note: This project is a split off from my [react-bootstrap-native-slider](https://www.npmjs.com/package/react-bootstrap-native-slider) plugin.  The plan is for the react-bootstrap-slider to become a dependency of react-bootstrap-native-slider, rather than have all the code bundled into the latter, as at present.


###How to use
Install from npm with:

    npm install --save react-bootstrap-slider

Require or import like so for ES6:

    import ReactBootstrapSlider from 'react-bootstrap-slider';

or like this for CommonJS:

    var ReactBootstrapSlider = require("react-bootstrap-slider");


The control is implemented in UMD format, so should also work for AMD/RequireJS, but I've not tested that.  You can also add it as a script tag.


Here's an example of how you might call it in your ReactJS's render method:

```JavaScript
<ReactBootstrapSlider
    value={this.state.currentValue}
    handleChange={this.changeValue}
    step={this.state.step}
    max={this.state.max}
    min={this.state.min}
    orientation="vertical"
    reverse={true}
    disabled="disabled" />
    }
```

The **value**, **step**, **max** and **min** parameters should be self-explanatory.  handleChange is the callback method that will be called when the slider actually changes.  (NB: this is the "change" event for the Bootstrap slider.)

If the optional parameter **disabled** is included, and is set to "disabled", then the slider will display in a disabled state.  If the parameter is not included, or is set to anything else except "disabled", then the slider control will be enabled.

The default **orientation** value is 'horizontal', so you only need to include that prop if you want to set it to 'vertical'.

As of version 1.0.02, other values passed into the component will also passed into the underlying bootstrap-slider component via the [Object Spread Operator that's been proposed for ES2017](https://github.com/Microsoft/TypeScript/issues/7617) (yes, that's how cutting edge I am!!).  See [seyria's documentation](https://github.com/seiyria/bootstrap-slider) for a full list of these.  Those parameters have not all been tested yet but the `reverse` parameter definitely works, and I have included this in the demo of the vertical slider.


##Development
To develop, issue this command:

    npm run start

then point your browser to [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html).  You need to edit the code in the /src folder.  It will update in the browser automatically, courtesy of webpack-dev-server.

To build the distribution version, issue:

    npm run build

The build JavaScript file will go on the /dist folder as react-bootstrap-slider.js.  This is the main file for the project, which is used whenever this the react-bootstrap-slider package is loaded from npm.


##Demo
There is a /demo folder present, but it only contains index.html and the CSS files by default.  The JavaScript files need to be built before you can run this demo.  If there is no /demo/js folder present, then you need to run:

        npm run buildDemo

Webpack will build the JavaScript files for the demo and put them in the /demo/js/ folder.  Demo code will go in the /demo/js/slider-bundle.min.js file.  Any 3rd-party code (jQuery, Bootstrap and the react-bootstrap-slider itself) goes into the /demo/js/vendor.min.js file.  Source maps are generated both.  You can then open /demo/index.html in your browser.














