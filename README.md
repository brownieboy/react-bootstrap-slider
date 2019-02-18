# React Boostrap Slider

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  It was then ejected due to jQuery issue (see below).

## Overview

A ReactJS wrapper for [seiyria's Bootstrap Slider component](https://github.com/seiyria/bootstrap-slider) using Bootstrap 3.


### Bootstrap 4 Support
Bootstrap 4 is not currently supported, but is under investigation.  I am dependent on upstream issues to be resolved first, see [#689](https://github.com/seiyria/bootstrap-slider/issues/689) and [#856](https://github.com/seiyria/bootstrap-slider/pull/856) on the Bootstrap Slider Github repository.

## Background

Note: This project started as a split off from my [react-bootstrap-native-slider](https://www.npmjs.com/package/react-bootstrap-native-slider) plugin, which I've subsequently deprecated.

## How to install

Install from npm with:

    npm install --save react-bootstrap-slider

or

    yarn add react-bootstrap-slider

Immport like so for ES6:

    import ReactBootstrapSlider from 'react-bootstrap-slider';


The control is implemented in UMD format, so should also work for AMD/RequireJS, but I've not tested that.


### Peer Dependencies

React, React Dom and Bootstrap are listed as peer dependencies (peerDependencies section in package.json) for react-bootstrap-slider.  They will _not_ be installed automatically when you install this component into your own project.  You will need to install them yourself, as part of that project, if you have not done so already.  This command will install them for you if you don't yet have them:

    npm install react react-dom prop-types bootstrap@^3 --save
or

    yarn add react react-dom prop-types bootstrap@^3

#### jQuery
The bootstrap-slider component - and, therefore, react-bootstrap-slider - will work with jQuery if it detects it in your project setup, but it is _not_ a requirement.  It works fine without jQuery.  However, if you are using Webpack or Browserify to build your project, you may get a "missing dependency" build error if jQuery is not present.  This is a known, upstream issue in bootstrap-slider.  Please see [How do I exclude the optional JQuery dependency from my build?](https://github.com/seiyria/bootstrap-slider#how-do-i-exclude-the-optional-jquery-dependency-from-my-build) on the Bootstrap Slider's Readme for how you can workaround this issue.

You must also ensure that you have included bootstrap-slider's CSS file in your build, otherwise the control will be blank!  You'll also need Bootstrap's own CSS file too, of course.  If you're using Webpack, which you will be if you have a Create React App based project, then you can import the CSS file directly into your build, like so:

```JavaScript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
```
Those two imports need to be in your top-level JavaScript file, e.g. App.js.

Or you can simply add the files as links in your HTML file as a link e.g.:

```HTML
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.4.1/bootstrap-slider.min.js"></script>
```
checking that the versions match those of Bootstrap and Bootsrap Slider themselves.

## How to use

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


## Development
After cloning [the repository from Github](https://www.npmjs.com/package/react-bootstrap-slider), run either:

    yarn
or

    npm install

to install the dependencies.  Note: React, React Dom, Prop Types and Bootstrap _will_ all be installed this time because they are listed as development dependencies as well as peer dependencies for the project.  Please see [discussion on PR43](https://github.com/brownieboy/react-bootstrap-slider/pull/43) for why I've listed these packages under both peerDependencies and devDependencies.)

To develop, issue this command:

    npm run start
or

    yarn start

Your default browser should launch and load the demo page at <http://localhost:3000.>  Any changes that you make to the source JavaScript files will hotload into this browser page.

### The Files

You need to edit the code in the /src folder.  There are two files there: react-bootstrap-slider.js is the source code for the react-bootstrap-slider npm package itself, hwre slider-app-demo is the for the host Demo page.  

  It will update in the browser automatically, courtesy of webpack-dev-server.

## Building the NPM Package

To build a distribution version, issue:

    npm run buildComponents

The build JavaScript file will go on the /dist folder as react-bootstrap-slider.js.  This is the main file for the project, which is used whenever this the react-bootstrap-slider package is loaded from npm.


## Tests
There are is only one unit tests, which was installed by Create React App.  All it does is test that the demo app loads, so probably not worth running.

End to end (E2E) tests are handled by Protractor with Selenium Web Driver.


### Installing E2E Tests Dependencies

Before running the E2E tests, you'll need to install the web driver first by running:

        npm run updateWebDriver

You should only have to do this once though, although beware that Selenium can be picky about which web browser versions that it will run against.

### Running Tests Against Dev Version
The same set of tests can be run against either the Dev version or the built version of the Demo.  To run run tests against the development version of the Demo, you need to run:

        npm run testDev

This assumes that you already have the Demo running on port 3000 via an `npm run start` or `yarn start` command (see ).  So putting that all together, the full commands to run the Dev tests would be:

        npm run updateWebDriver
        npm run start
        npm run testDev

Note: the last of those three commands will need to be run in a separate terminal window/tab thatn the first two, because the first terminal will be tied up with running webpack-dev-server.


### Test Results & Reports
Test results will be displayed in whichever terminal to your the `npm run testDev` or `yarn testDev` commands.

The tests will also generate HTML reports in the /reports folder, courtesy of the [protractor-jasmine2-screenshot-reporter](https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter) package.  Open the /reports/index.html file in a browser to see them.  If you have [serve](https://www.npmjs.com/package/serve) installed globally (`npm i serve -g`), then:

    serve -s reports

will serve the reports for you at <http://localhost:5000> by default.

  Note how each test result in this report is a URL.  If you click on the URL, it will take you to a screen shot of how the browser looked when that particular test ran, which is pretty neat, IMHO!

### Editing Tests
The tests themselves are in the file tests/e2e/slidertest1.js.  The tests check:

1. The page loads with the correct default values set for both the vertical and horizontal versions of the Demo.
1. Dragging the horizontal slider to the right increases its value correctly
1. Dragging the vertical slider upwards increases its value correctly
1. Clicking on the Change Axes button for both demos changes each one's respective default value correctly.

For more information on writing tests, checkout [the Protractor Tutorial](http://www.protractortest.org/#/tutorial), and [the Protractor API](http://www.protractortest.org/#/api).

### Further Test Configs
Protractor defaults to using the Firefox browser, but I've overridden the config so that it uses Chrome instead, so make sure that you have Chrome installed!  If you want to use Firefox or even IE, then you'll need to make some modifications to the protractor.local.conf.js file.  Google for how to do that.

Whatever other changes you make to protractor.local.conf.js, you _must_ _not_ remove this line:

        browser.ignoreSynchronization = true;

Protractor is actually a testing tool designed for AngularJS and Angular, but hey, nobody's perfect! :wink:

By default, Protractor will wait for Angular models to send their update messages before proceeding onto the next test.  This line tells Protractor not to wait for any such messages, which, of course, won't be coming because you're not using Angular.

## Update History

Version 2.1.5: 2 May 2018
* Fixed issue where control was permanently disabled if initial `max` value was set to zero.

Version 2.1.4: 13 Apr 2018
* Explicitly allow labelledby to be passed into the control 

Version 2.1.2 & 2.1.3: 21 Oct 2017
* 2.1.2 Fixed issue where setting the "disabled" prop did not disable the component on load.
* 2.1.3 Removed a debugging console.log that I introduced in 2.1.2 (doh!).

Version 2.1.1: 3 Oct 2017
* Fixed missing peerDependencies and devDependencies issue.

Version 2.1.0: 30 Sep 2017
* Updated for React 16 (Fiber).
* Updated dev dependencies to latest versions too.
* Removed React and Bootstrap from dependencies list.  They are now in devDependencies and peerDependencies.

Version 2.0.1: 19 Aug 2017
* Module is now destroyed correctly via componentWillUnmount method (thanks to KevBelisle for the PR).

Version 2.0.0: 30 Apr 2017
* Updated for React 15.5.x and 16 (Fiber) compatibility by using prop-types package.  This version will not work with older versions of React, hence the major version bump.

Version 1.1.7: 2 Apr 2017
* Removed jQuery as any kind of dependency.  It's not actually needed, but it is used by boostrap-slider if present.

Version 1.1.6: 28 Mar 2017
* Moved bootstrap, jquery, react and react-dom from dependencies to peerDependencies and devDependencies. (They need to in both because neither yarn or npm install command actually installs peerDependencies.)

Version 1.1.5: 7 Mar 2017
* Remove unnecessary console.log() calls (thanks to saevarom for the PR).
* Fixed path to testBuild script in package.json

Version 1.1.4: 11 Feb 2017
* Removed es6bindall as a dependency.  This allows using react-bootstrap-slider with Require.JS.  (PR merge from TalAter.)
* Fixed readme.md error: `reverse` parameter should actually be `reversed`.  (Thanks to chunkiat82 for the pick up.)

Version 1.1.3: 19 Nov 2016
* Fixed bug where min, max and step values were not updating correctly when component received new props for them.
* Updated dependencies to latest versions.

Version 1.1.2: 24 Sep 2016
* Reverted change of slider trigger event from `change` to `slideStop` in v1.1.1.  This was a dumb way of doing it, and was a borderline breaking change to boot.
* Added new `slideStop` event, which maps to the bootstrap-slider event of the same name
* Added new `change` event, which maps to the bootstrap-slider event of the same name.  Note: this is in _addition_ to the previous `handleChange` event, which will continue to work and is _not_ being deprecated here.

Version 1.1.1: 23 Sep 2016 (NB: Bad version.  Do not use!  See 1.12 comments above.)
* Changed main slider trigger event from `change` to `slideStop`.  Component should now be less chatty with improved performance.

Version 1.1.0: 21 Sep 2016.
* Updated to seiyria's 9.2 version.  This includes the rangeHighlights feature.
* Updated readme to specify inclusion of bootstrap-slider's CSS file.
* Removed reports folder from NPM package

Version 1.0.6: 1 August 2016.
* Fixed issue where ticks props were not being rendered.  This is because the code was assuming that there would always be min and max props, but the ticks props actually override these.

Version 1.0.5: 13 June 2016.
* Explained how use dual slider controls.  Added test for same.
* Cleaned up demo to code to have one Demo class instead of three.

Version 1.0.4: 12 June 2016.
* Added vertical slider to demo page.
* Updated build process to copy (and update) CSS and HTML files from /src to /demo folder using Gulp.  So no longer have to update the /demo files manually when updating build.
* Added test suite using Protractor/Selenium.

Version 1.0.3: 7 June 2016.
* Fixed path issues in package.json scripts.
* Removed postInstall step from package.json, as not actually required.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
