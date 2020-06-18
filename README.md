# React Bootstrap Slider

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  It was then ejected due to jQuery issue (see below).

## Overview

A ReactJS wrapper for [seiyria's Bootstrap Slider component](https://github.com/seiyria/bootstrap-slider) using Bootstrap.  From version 3.0.0, we are supporting Bootstrap 4 only.  Please use version 2.2.3 if you are still using Bootstrap 3.


## How to install

Install from npm with:

    npm install --save react-bootstrap-slider

or

    yarn add react-bootstrap-slider

Import like so for ES6:

    import ReactBootstrapSlider from 'react-bootstrap-slider';


The control is implemented in UMD format, so should also work for AMD/RequireJS, but I've not tested that.


### Peer Dependencies

React, React Dom and Bootstrap are listed as peer dependencies (peerDependencies section in package.json) for react-bootstrap-slider.  They will _not_ be installed automatically when you install this component into your own project.  You will need to install them yourself, as part of that project, if you have not done so already.  This command will install them for you if you don't yet have them:

    npm install react react-dom prop-types bootstrap@^4 --save
or

    yarn add react react-dom prop-types bootstrap@^4

#### jQuery

The bootstrap-slider component - and, therefore, react-bootstrap-slider - will work with jQuery if it detects it in your project setup, but it is _not_ a requirement.  It works fine without jQuery.  However, if you are using Webpack or Browserify to build your project, you may get a "missing dependency" build error if jQuery is not present.  This is a known, upstream issue in bootstrap-slider.  Please see [How do I exclude the optional JQuery dependency from my build?](https://github.com/seiyria/bootstrap-slider#how-do-i-exclude-the-optional-jquery-dependency-from-my-build) on the Bootstrap Slider's Readme for how you can workaround this issue.  You can also see how I did it by inspecting the /examples/config/webpack.config.js file and searching for "jQuery".

You must also ensure that you have included bootstrap-slider's CSS file in your build, otherwise the control will be blank!  You'll also need Bootstrap's own CSS file too, of course.  If you're using Webpack, which you will be if you have a Create React App based project, then you can import the CSS file directly into your build, like so:

```JavaScript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
```

Those two imports need to be in your top-level JavaScript file, e.g. App.js.

Or you can simply add the files as links in your HTML file as a link e.g.:

```HTML
<link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/11.0.2/bootstrap-slider.min.js"></script>
```

checking that the versions match those of Bootstrap and Bootsrap Slider themselves.

## How to use react-bootstrap-slider

Here's an example of how you might call it in your ReactJS's render method:

```JavaScript
<ReactBootstrapSlider
    value={this.state.currentValue}
    change={this.changeValue}
    slideStop={this.changeValue}
    step={this.state.step}
    max={this.state.max}
    min={this.state.min}
    orientation="vertical"
    reversed={true}
    disabled="disabled" />
```

The **value**, **step**, **max** and **min** parameters should be self-explanatory.  The `change` event is the callback method that will be called when the slider actually changes.  (NB: this is the `change` event for the Bootstrap slider.)  As of version 1.1.2, there is a new `slideStop` event, which only triggers when you've _finished_ moving the slider (i.e. you release it).  This makes `slideStop` a deal less "chatty" than the `change` event.  Decide which one you need; you'll only ever need one or the other (unlike my example code above!).

If the optional parameter **disabled** is included, and is set to "disabled", then the slider will display in a disabled state.  If the parameter is not included, or is set to anything else except "disabled", then the slider control will be enabled.

The default **orientation** value is 'horizontal', so you only need to include that prop if you want to set it to 'vertical'.

If **value** is a two member array, then the slider will have two handles: minimum and maximum.  You should also pass win a **range** parameter set to true in this case.

As of version 1.0.5, other values passed into the component will also passed into the underlying bootstrap-slider component via the [Object Spread Operator that's been proposed for ES2017](https://github.com/Microsoft/TypeScript/issues/7617) (yes, that's how cutting edge I am!!).  See [seyria's documentation](https://github.com/seiyria/bootstrap-slider) for a full list of these.  Those parameters have not all been tested yet but the `reversed` parameter definitely works, and I have included this in the demo of the vertical slider.

Version 1.0.6 fixed an issue that prevented ticks props from being rendered.  Pass in ticks props like so:

```JavaScript
ticks = {[0, 100, 200, 300, 400]}
ticks_labels = {["$0", "$100", "$200", "$300", "$400"]}
ticks_snap_bounds = { 30 }
```