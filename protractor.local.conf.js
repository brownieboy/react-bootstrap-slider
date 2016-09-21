/* eslint-env node */
/* global browser, jasmine, Promise */
// This config file is to run against webpack-dev-server, which you have start first via "npm run start"
// in a separate console window.

// var HtmlReporter = require("protractor-html-screenshot-reporter");
var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

var TARGET = process.env.npm_lifecycle_event; // This is the name of the package.json script that called this task

var SpecReporter = require("jasmine-spec-reporter");
var path = require("path");

var htmlScreenshotReporterDestination, reportTitle;

switch (TARGET) {
   case "testAddEdit":
      reportTitle = "Resinsurance Save Tests";
      htmlScreenshotReporterDestination = "/screenshots/tablessaved";
      break;
   default:
      reportTitle = "Dev Test";
      htmlScreenshotReporterDestination = "/reports";
}

var ROOT_PATH = path.resolve(__dirname);

var today = new Date(),
   timeStamp = (("0" + today.getDate()).slice(-2)) + "/" + (("0" + (today.getMonth() + 1)).slice(-2)) + "/" + today.getFullYear() + " " + (("0" + today.getHours()).slice(-2)) + ":" + (("0" + today.getMinutes()).slice(-2));

var reporter = new HtmlScreenshotReporter({
   dest: ROOT_PATH + htmlScreenshotReporterDestination,
   filename: "index.html",
   showSummary: true,
   showQuickLinks: false,
   showConfiguration: true,
   reportTitle: reportTitle + " - run " + timeStamp
});

exports.config = {
   specs: [ROOT_PATH + "/tests/e2e/*.js"],
   capabilities: {
      // browserName: "firefox"
      browserName: "chrome",
      chromeOptions: {
          args: [
              "--start-maximized"
          ]
      }
   },
   baseUrl: "http://localhost:3000",
   beforeLaunch: function() {
      return new Promise(function(resolve) {
         reporter.beforeLaunch(resolve);
      });
   },
   framework: "jasmine",
   onPrepare: function() {
      browser.ignoreSynchronization = true; // Important. Stops Protractor waiting on Angular rubbish.
      browser.driver.manage().window().maximize();  // Doesn't work with Chrome.  Specify in its capabilities

      require("babel-register");
      jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: "summary", displayFailuresSummary: false }));
      jasmine.getEnv().addReporter(reporter);
   },
   afterLaunch: function(exitCode) {
      return new Promise(function(resolve) {
         reporter.afterLaunch(resolve.bind(this, exitCode));
      });
   },
   allScriptsTimeout: 5000
};



/*
var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});

exports.config = {
   // ...

   // Setup the report before any tests start
   beforeLaunch: function() {
      return new Promise(function(resolve){
        reporter.beforeLaunch(resolve);
      });
   },

   // Assign the test reporter to each running instance
   onPrepare: function() {
      jasmine.getEnv().addReporter(reporter);
   },

   // Close the report after all tests finish
   afterLaunch: function(exitCode) {
      return new Promise(function(resolve){
        reporter.afterLaunch(resolve.bind(this, exitCode));
      });
   }
}
*/
