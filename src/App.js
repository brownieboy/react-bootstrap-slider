import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SliderAppDemo from "./js/slider-app-demo.js";

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
