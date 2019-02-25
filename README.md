# React Bootstrap Slider

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  It was then ejected due to jQuery issue (see below).

## Overview

A ReactJS wrapper for [seiyria's Bootstrap Slider component](https://github.com/seiyria/bootstrap-slider) using Bootstrap 3.


### Bootstrap 4 Support

Bootstrap 4 is not currently supported, but is under investigation.  I am dependent on upstream issues to be resolved first, see [#689](https://github.com/seiyria/bootstrap-slider/issues/689) and [#856](https://github.com/seiyria/bootstrap-slider/pull/856) on the Bootstrap Slider Github repository.


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

    npm install react react-dom prop-types bootstrap@^3 --save
or

    yarn add react react-dom prop-types bootstrap@^3

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
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.4.1/bootstrap-slider.min.js"></script>
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


## Development

### Component Source

After cloning [the repository from Github](https://www.npmjs.com/package/react-bootstrap-slider), run either:

    yarn
or

    npm install

in the project's root folder to install the dependencies.  Note: React, React Dom, Prop Types and Bootstrap _will_ all be installed this time because they are listed as development dependencies as well as peer dependencies for the project.  (Please see [discussion on PR43](https://github.com/brownieboy/react-bootstrap-slider/pull/43) for why I've listed these packages under both peerDependencies and devDependencies.)

The source code for the component is the /src/react-bootstrap-slider.js file.  You'll probably find it easiest to run the example demo (see next section) in order to see any changes that you make to the component's source.

To build a distribution version of the component, it's:

    yarn build
or

    npm run build

The built version wil be put in the /dist folder.


### The Example Demo

The Demo is based on [Create React App](https://facebook.github.io/create-react-app/).  I had to eject from Create React App though in order to work around the bootstrap-slider component's requirement for either jQuery or a stub of it to be present in the build system (see the **jQuery** section above).  

You need to edit the code in the /examples/src/slider-app-demo.js is the source code for the host Demo page.  The /examples folder has its own NPM build steps (i.e. its own package.json file), so you'll have to install the dependencies separately here.  So make sure your terminal is in the /examples folder this time, then run either:

    yarn
or

    npm install

again.

To run the demo in Development mode, from the /examples folder it's:

    yarn start
or

    npm run start

This should launch your browser and load <https://localhost:3000> with the demo running.  This version takes its react-bootstrap-slider code from development source code in the /src folder of the project's root folder.  So any change that you make to that source code will hotload straight into the demo.  

You may notice that the demo source code that it's actually imported via a symlink.  This to work around an issue with how the Webpack build treats packages imported from outside of current project's hierarchy.  (Note: this will probably not work on Windows.  I haven't tested it there.)

To build a Production version of the demo, from the /examples folder again, it's:

    yarn build
or

    npm run build

This will put a production ready version of the demo in the /examples/build folder.  Note: this version will import its react-bootstrap-slider component from the /dist folder of the project's root folder - i.e., the built version of the component.  So make sure that you've actually built the component (see above) before building the demo!  You must also have installed all the packages (`yarn` or `npm i`) in the root folder of the project, so that the slider component can find its local version of React itelf.

Once you've built the Production version of the Demo, you can open it with the local web server of your choice.  Because the demo project was created with Create React App, you'll see a prompt telling you how to do this with Server, i.e. `serve -s build`.  If you don't have Serve, you can install it globally via `npm i serve -g`.


## Tests

There are is only one unit tests, which was installed by Create React App.  All it does is test that the demo app loads, so probably not worth running.

End to end (E2E) tests are handled by Protractor with Selenium Web Driver.


### Installing E2E Tests Dependencies

Before running the E2E tests, you'll need to install the web driver first by running:

        npm run updateWebDriver

Again, you need to be in that /examples folder before running this command.  You should only have to do this once though, although beware that Selenium can be picky about which web browser versions that it will run against.


### Running Tests Against Dev Version

The same set of tests can be run against either the Dev version or the built version of the Demo.  To run run tests against the Development version of the Demo, you need to run:

        npm run e2eDev

This assumes that you already have the Demo running on port 3000 via an `npm run start` or `yarn start` in the project's root folder (see above).

To run run tests against the Production version of the Demo, you need to run:

        npm run e2eProd

This assumes that you have already have built the demo (and source component), and have serve running on port 5000 (see above).

### Test Results & Reports

Test results will be displayed in whichever terminal you ran your test commands.

The tests will also generate HTML reports in the /examples/reports folder, courtesy of the [protractor-jasmine2-screenshot-reporter](https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter) package.  Open the /examples/reports/index.html file in a browser to see them.  (I use the Open in Browser extension for VSCode for this.)

When you open the reports, note how each test result is a URL.  If you click on the URL, it will take you to a screen shot of how the browser looked when that particular test ran, which is pretty neat, IMHO!

### Editing Tests
The tests themselves are in the file /examples/tests/e2e/slidertest1.js.  The tests check:

1. The page loads with the correct default values set for both the vertical and horizontal versions of the Demo.
1. Dragging the horizontal slider to the right increases its value correctly
1. Dragging the vertical slider upwards increases its value correctly
1. Clicking on the Change Axes button for both demos changes each one's respective default value correctly.

For more information on writing tests, checkout [the Protractor Tutorial](http://www.protractortest.org/#/tutorial), and [the Protractor API](http://www.protractortest.org/#/api).

### Further Test Configs

Protractor defaults to using the Firefox browser, but I've overridden the config so that it uses Chrome instead, so make sure that you have Chrome installed!  If you want to use Firefox or even IE, then you'll need to make some modifications to the protractor.local.conf.js file.  Google for how to do that.

Whatever other changes you make to protractor.local.conf.js, you _must_ _not_ remove this line:

        browser.ignoreSynchronization = true;

Protractor is actually a testing tool designed for AngularJS and Angular, but hey, nobody's perfect! :wink:  By default, Protractor will wait for Angular models to send their update messages before proceeding onto the next test.  This line tells Protractor not to wait for any such messages, which, of course, won't be coming because you're not using Angular.

## Update History

Version 2.2.2: 25 Feb 2019

* Fixed absolute require bug regression in 2.2.0/2.2.1.  (It's @babel/react preset, not @babel/react-app !)

Version 2.2.0 and 2.2.1: 23 Feb 2019

* Update to bootstrap-slider 10.
* Major overhaul of Demo vs Component source code.  They're now split into separate folders with separate built steps and package.json files.
* 2.2.1 is a Readme correctly only.  No actual code changes.

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
* Removed jQuery as any kind of dependency.  It's not actually needed, but it is used by bootstrap-slider if present.

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
