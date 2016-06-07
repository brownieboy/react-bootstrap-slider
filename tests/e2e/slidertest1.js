/* eslint-env node, protractor, jasmine */

var EC = protractor.ExpectedConditions;

describe("Page loads", function() {
   // setup
   it("should display horizontal Demo value of 3000", function() {
      browser.get("http://localhost:8080/src/index.html");
      browser.wait(EC.presenceOf(element(by.css("body")), 1000));
      browser.wait(EC.presenceOf(element(by.id("valueSpanHorizontal")), 2000));

      var elementToTest = element(by.id("valueSpanHorizontal"));
      expect(elementToTest.getText()).toEqual("3000");
      // expect(page.clientRowName.getText()).toEqual("ABC");
      // var foo = element(by.id('foo'));
      // expect(foo.getText()).toEqual('Inner text');

   });
});

// describe("Clicking Change Axes button for horizontal demo", function() {
//    // setup
//    it("sets up initial stuff", function() {
//       browser.get("http://localhost:8080");
//       browser.wait(EC.presenceOf(element(by.css("body")), 1000));
//    });

//    it("should add 'apples' to the list", function() {
//       element(by.id("butHorizontal")).click();
//       browser.wait(EC.presenceOf(element(by.id("mainlist")), 1000));
//       expect(element(by.id("valueSpanHorizontal"))).toEqual(3000);
//       element.all(by.cssContainingText("#mainlist li", "apple")).then(function(items) {
//          expect(items.length).toBeGreaterThan(0);
//       });
//    });
// });

// describe("Entering 'bananas' into text box and clicking Add button", function() {
//    it("should add 'bananas' to the list", function() {
//       element(by.id("inputtodo")).sendKeys("bananas");
//       element(by.id("butAdd")).click();
//       element.all(by.cssContainingText("#mainlist li", "bananas")).then(function(items) {
//          expect(items.length).toBeGreaterThan(0);
//       });
//    });

// });
