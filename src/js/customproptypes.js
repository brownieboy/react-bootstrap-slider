
// Tests to see if prop is a number or an array.  Clunky, but will do for now.
export function isPropNumberOrArray(props, propName, componentName) {
  // console.log("props[" + propName + "]=" + props[propName]);
  if (!((typeof props[propName] === "number") || (typeof props[propName] === "undefined") || Array.isArray(props[propName]))) {
    return new Error(
      [
        componentName,
        "requires that",
        propName,
        "be a number or an array."
      ].join(" ")
    );
  }
}
