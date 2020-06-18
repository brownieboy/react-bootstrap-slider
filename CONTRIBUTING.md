# Contributing to React Bootstrap Slider

PRs accepted in the [the Github repository](https://www.npmjs.com/package/react-bootstrap-slider).  Please include a few words about what it is you're trying to add or fix.   Refer to an existing issue from the Issues section.


## React Bootstrap Slider Component Source

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


## The Example Demo

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

This assumes that you already have the Demo running on port 3000 via an `npm run start` or `yarn start` in the project's /examples folder (see above).

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