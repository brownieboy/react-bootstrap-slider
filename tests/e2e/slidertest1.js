/* eslint-env node, protractor, jasmine */

const EC = protractor.ExpectedConditions;

describe("Page loads", () => {
  // setup
  // browser.driver.sleep(5000);
  it("should display horizontal Demo value of '3000'", async () => {
    // browser.get("http://localhost:8080/src/index.html");
    await browser.get("index.html");
    // await browser.wait(EC.presenceOf(element(by.css("body")), 1000));
    await browser.wait(
      EC.presenceOf(element(by.id("valueSpanhorizontalSlider")), 2000)
    );
    console.log("valueSpanhorizontalSlider");

    expect(element(by.id("valueSpanhorizontalSlider")).getText()).toEqual(
      "3000"
    );
  });

  it("should display vertical Demo value of '3000'", () => {
    expect(element(by.id("valueSpanverticalSlider")).getText()).toEqual("3000");
  });

  it("should display dual Demo lower value of '3000'", () => {
    expect(element(by.id("valueSpandualSliderLow")).getText()).toEqual("3000");
  });

  it("should display dual Demo higher value of '10000'", () => {
    expect(element(by.id("valueSpandualSliderHigh")).getText()).toEqual(
      "10000"
    );
  });

  it("should display Ticks Demo value of '200'", () => {
    expect(element(by.id("valueSpanticksSlider")).getText()).toEqual("200");
  });

  it("should display Disabled Demo value of '3000'", () => {
    expect(element(by.id("valueSpandisabledSlider")).getText()).toEqual("3000");
  });
});

describe("Dragging horizontal slider 100px to the right", () => {
  it("should display horizontal Demo value of '12000'", async () => {
    const slider = element(by.css("#horizontalSlider .min-slider-handle"));
    await browser
      .actions()
      .dragAndDrop(slider, { x: 100, y: 0 })
      .perform();
    expect(element(by.id("valueSpanhorizontalSlider")).getText()).toEqual(
      "12000"
    );
  });
});

describe("Dragging vertical slider 50px upwards", () => {
  it("should display vertical Demo value of '8000'", async () => {
    const slider = element(by.css("#verticalSlider .min-slider-handle"));
    // NB: .dragAndDrop() part of Selenium, not Protractor: http://release.seleniumhq.org/selenium-core/1.0.1/reference.html
    await browser
      .actions()
      .dragAndDrop(slider, { x: 0, y: -50 })
      .perform();
    expect(element(by.id("valueSpanverticalSlider")).getText()).toEqual("8000");
  });
});

describe("Dragging dual low slider 20px to the right", () => {
  it("should display dual low Demo value of '5000'", async () => {
    const slider = element(by.css("#dualSlider .min-slider-handle"));
    await browser
      .actions()
      .dragAndDrop(slider, { x: 20, y: 0 })
      .perform();

    expect(element(by.id("valueSpandualSliderLow")).getText()).toEqual("5000");
  });
});

describe("Dragging dual high slider 20px to the left", () => {
  it("should display dual low Demo value of '8000'", async () => {
    const slider = element(by.css("#dualSlider .max-slider-handle"));
    await browser
      .actions()
      .dragAndDrop(slider, { x: -20, y: 0 })
      .perform();

    expect(element(by.id("valueSpandualSliderHigh")).getText()).toEqual("8000");
  });
});

// Values should swap over is max handle goes below the min handle
describe("Dragging dual high slider another 70px to the left", () => {
  it("should display dual low Demo value of '2000'", async () => {
    const slider = element(by.css("#dualSlider .max-slider-handle"));
    await browser
      .actions()
      .dragAndDrop(slider, { x: -70, y: 0 })
      .perform();

    expect(element(by.id("valueSpandualSliderLow")).getText()).toEqual("2000");
  });

  it("should display dual high Demo value of '5000'", () => {
    // What as the low value now becomes the high value
    expect(element(by.id("valueSpandualSliderHigh")).getText()).toEqual("5000");
  });
});

describe("Dragging ticks slider 40px to the right", () => {
  it("should display horizontal Demo value of '300'", async () => {
    const slider = element(by.css("#ticksSlider .min-slider-handle"));
    await browser
      .actions()
      .dragAndDrop(slider, { x: 40, y: 0 })
      .perform();
    expect(element(by.id("valueSpanticksSlider")).getText()).toEqual("300");
  });
});

describe("Clicking Change Axes button for horizontal demo", () => {
  it("should display horizontal Demo value of '500'", () => {
    element(by.id("buthorizontalSlider")).click();
    expect(element(by.id("valueSpanhorizontalSlider")).getText()).toEqual(
      "500"
    );
  });

  it("should have a Max value of '20000'", () => {
    expect(
      element(
        by.css("#verticalSlider .slider-handle.min-slider-handle")
      ).getAttribute("aria-valuemax")
    ).toEqual("20000");
  });
});

describe("Clicking Change Axes button for vertical demo", () => {
  it("should display horizontal Demo value of '500'", () => {
    element(by.id("butverticalSlider")).click();
    expect(element(by.id("valueSpanverticalSlider")).getText()).toEqual("500");
  });
});

describe("Dragging disabled slider 100px to the right", () => {
  it("should do nothing (value still shows '3000')", async () => {
    const slider = element(by.css("#disabledSlider .min-slider-handle"));
    await browser
      .actions()
      .dragAndDrop(slider, { x: 100, y: 0 })
      .perform();
    expect(element(by.id("valueSpandisabledSlider")).getText()).toEqual("3000");
  });

});

describe("Clicking Change Axes button for start zero demo", () => {
  it("should display horizontal Demo value of '500'", () => {
    element(by.id("startZeroSlider")).click();
    expect(element(by.id("startZeroSlider")).getText()).toEqual("500");
  });
});
