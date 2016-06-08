/* eslint-env node, protractor, jasmine */

var EC = protractor.ExpectedConditions;

describe("Page loads", function() {
   // setup
   // browser.driver.sleep(5000);
   it("should display horizontal Demo value of '3000'", function() {
      // browser.get("http://localhost:8080/src/index.html");
      browser.get("index.html");

      browser.wait(EC.presenceOf(element(by.css("body")), 1000));
      browser.wait(EC.presenceOf(element(by.id("valueSpanHorizontal")), 2000));
      expect(element(by.id("valueSpanHorizontal")).getText()).toEqual("3000");
   });

   it("should display vertical Demo value of '3000'", function() {
      expect(element(by.id("valueSpanVertical")).getText()).toEqual("3000");
   });
});

describe("Dragging horizontal slider 100px to the right", function() {
   it("should display horizontal Demo value of '12000'", function() {

      var slider = element(by.css("#horizontalSlider .min-slider-handle"));
      browser.actions().dragAndDrop(
         slider, { x: 100, y: 0 }
      ).perform();
      expect(element(by.id("valueSpanHorizontal")).getText()).toEqual("12000");
   });
});

describe("Dragging vertical slider 50px upwards", function() {
   it("should display vertical Demo value of '8000'", function() {

      var slider = element(by.css("#verticalSlider .min-slider-handle"));
      // NB: .dragAndDrop() part of Selenium, not Protractor: http://release.seleniumhq.org/selenium-core/1.0.1/reference.html
      browser.actions().dragAndDrop(
         slider, { x: 0, y: -50 }
      ).perform();
      expect(element(by.id("valueSpanVertical")).getText()).toEqual("8000");
   });
});

describe("Clicking Change Axes button for horizontal demo", function() {
   it("should display horizontal Demo value of '500'", function() {
      element(by.id("butHorizontal")).click();
      expect(element(by.id("valueSpanHorizontal")).getText()).toEqual("500");
   });
});

describe("Clicking Change Axes button for vertical demo", function() {
   it("should display horizontal Demo value of '700'", function() {
      element(by.id("butVertical")).click();
      expect(element(by.id("valueSpanVertical")).getText()).toEqual("700");
   });
});
