import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import "./css/bootstrap.min.css";
// import "./css/bootstrap-slider.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import SliderAppDemo from "./js/slider-app-demo.js";

console.log("App.js, process.env:");
console.log(process.env);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Bootstrap Slider Demo</h1>
        </header>
        <SliderAppDemo />
      </div>
    );
  }
}

export default App;
