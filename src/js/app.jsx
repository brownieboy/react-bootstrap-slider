import React from 'react';
import ReactDOM from 'react-dom';
import es6BindAll from 'es6bindall';
import ReactNativeBootstrapSlider from  './react-native-bootstrap-slider.jsx';
console.log("app.jsx loaded");

// CommonJS expamples below if not using ES6.
// var reactNativeBootstrapSliderObj = require('./react-native-bootstrap-slider.jsx');
// var ReactNativeSlider = reactNativeBootstrapSliderObj.ReactNativeSlider;
// var ReactBootstrapSlider  = reactNativeBootstrapSliderObj.ReactBootstrapSlider;
// var ReactNativeBootstrapSlider = reactNativeBootstrapSliderObj.ReactNativeBootstrapSlider;

console.log("stop");

class Demo extends React.Component {
    constructor(props){
    	super(props);
      this.state = {
         currentValue: this.props.startValue,
         min: this.props.min,
         max: this.props.max,
         step: this.props.step
      };
     	es6BindAll(this, ["changeValue", "changeAxes"]);
   }
   changeValue(e) {
        console.log("changeValue");
        this.setState({currentValue: e.target.value});
    }
    changeAxes(){
        this.setState({
            currentValue: 500,
            min: 0,
            max: 2000,
            step: 100
        });
    }
   render() {
        var newValue = this.state.currentValue;
        return (
            <div>
                 <ReactNativeBootstrapSlider
                    value={this.state.currentValue}
                    handleChange={this.changeValue}
                    step={this.state.step}
                    max={this.state.max}
                    min={this.state.min} />
                <br /><br />
                Value: {newValue}

                <br /><br />
                <button onClick={this.changeAxes}>Change axes!</button>
            </div>
            );
    }

}

ReactDOM.render(<Demo
		polyfill={false}
        startValue={3000}
        max={20000}
        min={1000}
        step={1000} />, document.getElementById("main"));
