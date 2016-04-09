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
    disabled="disabled" />
    }
```

The **value**, **step**, **max** and **min** parameters should be self-explanatory.  handleChange is the callback method that will be called when the slider actually changes.  (NB: this is the "change" event for the Bootstrap slider.)

If the optional parameter **disabled** is included, and is set to "disabled", then the slider will display in a disabled state.  If the parameter is not included, or is set to anything else except "disabled", then the slider control will be enabled.


##Development
To develop, issue this command:

    npm run start

then point your browser to [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html).  You need to edit the code in the /src folder.  It will update in the browser automatically, courtesy via webpack-dev-server.

To build the distribution version, issue:

    npm run build

The build JavaScript file will go on the /dist folder as react-bootstrap-slider.js.  This is the main file for the project, which is used whenever this the react-bootstrap-slider package is loaded from npm.

To build the demo, issue:

   npm run buildDemo

Wepback will build the JavaScript files for the demo in the /demo/js/ folder.  Demo code will go in the slider-bundle.min.js file.  Any 3rd-party code (jQuery, Bootstrap and the react-bootstrap-slider itself) goes into the vendor.min.js file.  Source maps are generated both.













