3.0.0 / 2020-06-18
========================
* Bootstrap 4 support.
* Split README.md into 3 files, adding CHANGELOG.md and CONTRIBUTING.md.

2.2.3 / 2020-01-25
========================

* Control now transpiled to ES5.  Should fix errors on IE 11 etc.

2.2.2 / 2019-03-25
========================
* Fixed absolute require bug regression in 2.2.0/2.2.1.  (It's @babel/react preset, not @babel/react-app !)

2.2.0 and 2.2.1 / 2019-02-23
========================
* Update to bootstrap-slider 10.
* Major overhaul of Demo vs Component source code.  They're now split into separate folders with separate built steps and package.json files.
* 2.2.1 is a Readme correctly only.  No actual code changes.

2.1.5 / 2018-05-02
========================
* Fixed issue where control was permanently disabled if initial `max` value was set to zero.

2.1.4 / 2018-04-13
========================
* Explicitly allow labelledby to be passed into the control 

2.1.2 & 2.1.3 / 2017-10-21
========================
* 2.1.2 Fixed issue where setting the "disabled" prop did not disable the component on load.
* 2.1.3 Removed a debugging console.log that I introduced in 2.1.2 (doh!).

2.1.1 / 2017-10-03
========================
* Fixed missing peerDependencies and devDependencies issue.

2.1.0 / 2017-09-30
========================
* Updated for React 16 (Fiber).
* Updated dev dependencies to latest versions too.
* Removed React and Bootstrap from dependencies list.  They are now in devDependencies and peerDependencies.

2.0.1 / 2017-08-19
========================
* Module is now destroyed correctly via componentWillUnmount method (thanks to KevBelisle for the PR).

2.0.0 / 2017-04-30
========================
* Updated for React 15.5.x and 16 (Fiber) compatibility by using prop-types package.  This version will not work with older versions of React, hence the major version bump.

1.1.7 / 2017-04-02
========================
* Removed jQuery as any kind of dependency.  It's not actually needed, but it is used by bootstrap-slider if present.

1.1.6 / 2017-03-28
========================
* Moved bootstrap, jquery, react and react-dom from dependencies to peerDependencies and devDependencies. (They need to in both because neither yarn or npm install command actually installs peerDependencies.)

1.1.5 / 2017-03-07
========================
* Remove unnecessary console.log() calls (thanks to saevarom for the PR).
* Fixed path to testBuild script in package.json

1.1.4 / 2017-02-11
========================
* Removed es6bindall as a dependency.  This allows using react-bootstrap-slider with Require.JS.  (PR merge from TalAter.)
* Fixed readme.md error: `reverse` parameter should actually be `reversed`.  (Thanks to chunkiat82 for the pick up.)

1.1.3 / 2016-11-19
========================
* Fixed bug where min, max and step values were not updating correctly when component received new props for them.
* Updated dependencies to latest versions.

1.1.2 / 2016-09-24
========================
* Reverted change of slider trigger event from `change` to `slideStop` in v1.1.1.  This was a dumb way of doing it, and was a borderline breaking change to boot.
* Added new `slideStop` event, which maps to the bootstrap-slider event of the same name
* Added new `change` event, which maps to the bootstrap-slider event of the same name.  Note: this is in _addition_ to the previous `handleChange` event, which will continue to work and is _not_ being deprecated here.

1.1.1: 2016-09-23 
========================
Bad version.  Do not use!  See 1.1.2 comments above.
* Changed main slider trigger event from `change` to `slideStop`.  Component should now be less chatty with improved performance.

1.1.0 / 2016-09-21
========================
* Updated to seiyria's 9.2 version.  This includes the rangeHighlights feature.
* Updated readme to specify inclusion of bootstrap-slider's CSS file.
* Removed reports folder from NPM package

1.0.6 / 2016-08-01.
========================
* Fixed issue where ticks props were not being rendered.  This is because the code was assuming that there would always be min and max props, but the ticks props actually override these.

1.0.5 / 2016-06-01
========================
* Explained how use dual slider controls.  Added test for same.
* Cleaned up demo to code to have one Demo class instead of three.