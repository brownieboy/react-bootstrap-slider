/* eslint-env node */
/* global browser, jasmine, Promise */
// This config file is to run against webpack-dev-server, which you have start first via "npm run start"
// in a separate console window.

// const HtmlReporter = require("protractor-html-screenshot-reporter");
const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

const TARGET = process.env.npm_lifecycle_event; // This is the name of the package.json script that called this task

const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
const path = require("path");

let htmlScreenshotReporterDestination;
let reportTitle;

switch (TARGET) {
  case "testAddEdit":
    reportTitle = "Resinsurance Save Tests";
    htmlScreenshotReporterDestination = "/screenshots/tablessaved";
    break;
  default:
    reportTitle = "Dev Test";
    htmlScreenshotReporterDestination = "/reports";
}

const ROOT_PATH = path.resolve(__dirname, "../");
// console.log("ROOT_PATH: " + ROOT_PATH);


const today = new Date(),
  timeStamp =
    ("0" + today.getDate()).slice(-2) +
    "/" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "/" +
    today.getFullYear() +
    " " +
    ("0" + today.getHours()).slice(-2) +
    ":" +
    ("0" + today.getMinutes()).slice(-2);

const reporter = new HtmlScreenshotReporter({
  dest: ROOT_PATH + htmlScreenshotReporterDestination,
  filename: "index.html",
  showSummary: true,
  showQuickLinks: false,
  showConfiguration: true,
  reportTitle: reportTitle + " - run " + timeStamp
});

exports.config = {
  directConnect: true,
  specs: [ROOT_PATH + "/tests/e2e/*.js"],
  chromeDriver: path.resolve(
    ROOT_PATH,
    "node_modules/webdriver-manager/selenium/chromedriver_79.0.3945.130"
  ),
  capabilities: {
    // browserName: "firefox"
    browserName: "chrome",
    // binary: "/opt/google/chrome/chrome",
    chromeOptions: {
      args: ["--disable-extensions"]
    }
  },
  baseUrl: "http://localhost:4444",
  beforeLaunch: () =>
    new Promise(resolve => {
      reporter.beforeLaunch(resolve);
    }),
  framework: "jasmine",
  onPrepare: () => {
    browser.ignoreSynchronization = true; // Important. Stops Protractor waiting on Angular rubbish.
    // browser.driver
    //   .manage()
    //   .window()
    //   .maximize(); // Doesn't work with Chrome.  Specify in its capabilities

    require("@babel/register");
    jasmine.getEnv().addReporter(
      new SpecReporter({
        displayStacktrace: "summary",
        displayFailuresSummary: false
      })
    );
    jasmine.getEnv().addReporter(reporter);
  },
  afterLaunch: exitCode =>
    new Promise(resolve => {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    }),
  allScriptsTimeout: 5000
};

/*
const reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});
exports.config = {
   // ...
   // Setup the report before any tests start
   beforeLaunch: () => {
      return new Promise(function(resolve){
        reporter.beforeLaunch(resolve);
      });
   },
   // Assign the test reporter to each running instance
   onPrepare: () => {
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
