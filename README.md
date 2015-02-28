# react.slider.test

###Overview
A ReactJS wrapper for the HTML5 input type="range" slider component, but using [seiyria's Bootstrap Slider component] (https://github.com/seiyria/bootstrap-slider) as a polyfill where the HTML5 version is not available (IE 9) or otherwise suffers from a problematic implementation (any other version of IE).


###Background
I like the HTML5 native range control, especially how easy it is manipulate via [ReactJS](http://facebook.github.io/react/), my current favourite JavaScript library.

Here's how the native JavaScript control is rendered in my plug-in:

```JavaScript
    render: function () {
        return (
            <input id="mySlider"
                type="range"
                value={this.props.value}
                min={this.props.min}
                max={this.props.max}
                onInput={this.props.handleChange}
                step={this.props.step} />
        );
    }
```

It's about as simple a rendering as you could want in React.  You'd pass some props into your component, and render them as the corresponding attributes on the input field.  Sweet as!

But knock me down with a feather if there aren't problems with IE.


####Internet Explorer Problems

#####Range control not supported on IE9
As it says, the <input type="range"> HTML5 element simply isnt supported on IE 9 and below.  It will actually display as a type="text" element, so instead of slider, you'll get a text box with a number in it.

This is what prompted me to create a React control that would fall back to the Bootstrap Slider for browsers that didn't support the <input type="range"> element.

As we all know, browser sniffing is evil, so I found this bit of code (can't remember where) to feature detect the presence of the <input type="range"> element:

```JavaScript
var input = document.createElement('input');
input.setAttribute('type', 'range');
this.supportsRange = input.type !== "text" ? true : false;
```

If you create such an element via JavaScript, and then read its "type" attribute, it will return "text" if the element is not supported.

Sweet, I could now insert the Bootstrap Slider for browsers that don't support the native slider element.  Which is when I ran into my second set of IE problems.


#####Change and Input events don't work correctly on IE 10 & 11
Apparently, the initial spec for the HTML5 range input element was defined rather vaguely.  In particular, it wasn't clear that the it's actually the Input event ('onInput' in ReactJS) that coders should look at to see if the user has moved the slider.  Whereas the Change event ('onChange' in ReactJS) is to be triggered when the user has actually *comitted* their change - i.e they've let go of the slider.  The Impressive Webs site has [a more detailed explanation of how the range slider events work](http://www.impressivewebs.com/onchange-vs-oninput-for-range-sliders/).


In my testing with ReactJS, the two events work in the same way: they both fire when the user moves the slider, and not when (s)he's let go of it.  Except for IE, which as ever, goes its own way.  

In my testing, I couldn't get IE 10 to respond correctly to either event with ReactJS.  I'm not sure if this is a ReactJS issue or an IE issue or a mixture of both.  I was going to dig into this further, but decided not to because...


#####The HTML5 slider looks crap on IE!
Check the **oninput in IE11* video on [that Impressive Webs article](http://www.impressivewebs.com/onchange-vs-oninput-for-range-sliders/).  It may be my personal preference, but doesn't the IE version of the HTML5 range slider look just bloody awful to you?

It's not just ugly, IMHO, it's inpractical too.  See how the handler (the bit on the control that you actually slide) is the same height as the rest of the sider?  Only IE does it this way.  Other browsers display a handler that is much more prominent, so its easie'r to pick out with your eyes, not to mention with your finger if you're on a tablet.  (Thankfully, the latter would only ever be an issue on Microsoft tablets, and seeing as they've sold about a dozen of these through the known universe, I guess that's not a major problem!.)

In the end, I made an executive decision in my React Bootstrap Slider component: I don't display the native HTML5 slider control on IE.  At least not for IE 10 or IE 11.  IE 12 is, apparently, a whole new ball game - it looks like Microsoft is ditching the much loved (not!) Trident rendering engine for Webkit!!!  I've not actually tested it on IE 12, but I've given it the benefit of the doubt, and will display the native control there.

This means that I've had to implement some nasty, browser-sniffing code after all, and I've implemented this as a ReactJS mixin, BrowserDetectMixin.  The mixin will report back IE version numbers up to version 12.  The component code will then display the Bootstrap Slider for IE 10 and IE 11.  For all other browsers, it will then do the feature detection thing, displaying the native HTML5 slider for those browsers that support it, and the Bootstrap Slider for those that don't!


###Requirements
- jQuery.  I'll look at a non-jQuery version soon.  It shouldn't be too hard
- Bootstrap 3, the JavaScript and the CSS
- [Seiyria's Bootstrap Slider] (https://github.com/seiyria/bootstrap-slider), again the JavaScript and the CSS
- react-native-bootstrap-slider.js and browserdetect-mixin.js from this repository



###How to use
You can follow the example code in the app.jsx file to see how to use.

The component is called SliderNativeBootstrap.  Here's an example of how you might call it in your ReactJS's render method:

```JavaScript
<SliderNativeBootstrap
    value={this.state.currentValue}
    handleChange={this.changeValue}
    step={this.state.step}
    max={this.state.max}
    min={this.state.min} />
```

The **value**, **step**, **max** and **min** parameters should be self-explanatory.  handleChange is the callback method that will be called when the slider actually changes.  (NB: this is the onInput event for the native HTML5 control, and the "change" event for the Bootstrap slider.)


####Forcing the Bootstrap version all the time
An optional parameter is **polyfill**.  When set to **true** (the default if you leave the parameter out) the component acts as I've described it above, i.e. displaying the HTML5 native slider for these browsers that support it properly, and the Bootstrap version for those that don't.  If you set this parameter to *false*, then the component will display the Bootstrap slider for *all* browsers.  Here's how you do might do that:

```JavaScript
<SliderNativeBootstrap
	polyfill={false}
    value={this.state.currentValue}
    handleChange={this.changeValue}
    step={this.state.step}
    max={this.state.max}
    min={this.state.min} />
```

[Seiyria's Bootstrap Slider] (https://github.com/seiyria/bootstrap-slider) component has many other options and parameters, of course.  I can look at rolling some of those into my compnent if anybody has a need for them.  I've kept it nice and simple for this version version though.













