const MAX_CHAR_LENGTH = 70;
const HUE_MAX = 200; // purple in the hsl color space
const CLASS_SAMPLE = "ngramwriter-sample";

export default class NgramWriter {
  constructor(element) {
    if (!element) {
      console.log("No data given.");
      return;
    }
    this.element = element;
    this._data = [];
    this.options = {
      renderMethod: this.getHSLHueValue
    };
  }
  get data() {
    return this._data;
  }
  set data(val) {
    if (val[0] && isNaN(val[0][1])) {
      val.shift(); //remove the header
    }
    this._data = val;
  }
  setSampleData(data) {
    this.options.renderMethod = this.getRGBLightnessValue;
    this.element.classList.add(CLASS_SAMPLE);
    this.data = data;
    this.outputText();
  }
  setData(data) {
    if (!data) {
      console.warn("no data was set");
      return;
    }
    this.options.renderMethod = this.getHSLHueValue;
    this.element.classList.remove(CLASS_SAMPLE);
    this.data = data;
    this.outputText();
  }
  getRGBLightnessValue(curr, max) {
    const q = curr / max;
    return `rgb(${255 * q},${255 * q},${255 * q})`;
  }
  getHSLHueValue(curr, max) {
    const hue = HUE_MAX - HUE_MAX * curr / max;
    return `hsl(${hue},100%,50%)`;
  }
  // C code from http://andrewnoske.com/wiki/Code_-_heatmaps_and_color_gradients
  //   bool getHeatMapColor(float value, float *red, float *green, float *blue)
  // {
  //   const int NUM_COLORS = 4;
  //   static float color[NUM_COLORS][3] = { {0,0,1}, {0,1,0}, {1,1,0}, {1,0,0} };
  //     // A static array of 4 colors:  (blue,   green,  yellow,  red) using {r,g,b} for each.
  //
  //   int idx1;        // |-- Our desired color will be between these two indexes in "color".
  //   int idx2;        // |
  //   float fractBetween = 0;  // Fraction between "idx1" and "idx2" where our value is.
  //
  //   if(value <= 0)      {  idx1 = idx2 = 0;            }    // accounts for an input <=0
  //   else if(value >= 1)  {  idx1 = idx2 = NUM_COLORS-1; }    // accounts for an input >=0
  //   else
  //   {
  //     value = value * (NUM_COLORS-1);        // Will multiply value by 3.
  //     idx1  = floor(value);                  // Our desired color will be after this index.
  //     idx2  = idx1+1;                        // ... and before this index (inclusive).
  //     fractBetween = value - float(idx1);    // Distance between the two indexes (0-1).
  //   }
  //
  //   *red   = (color[idx2][0] - color[idx1][0])*fractBetween + color[idx1][0];
  //   *green = (color[idx2][1] - color[idx1][1])*fractBetween + color[idx1][1];
  //   *blue  = (color[idx2][2] - color[idx1][2])*fractBetween + color[idx1][2];
  // }
  getCharacterWidth() {
    let sample = document.createElement("span");
    let w = 0;
    sample.style = {
      padding: 0,
      position: "fixed",
      top: "-100px"
    };
    sample.innerHTML = "M";
    this.element.appendChild(sample);
    w = sample.getBoundingClientRect().width;
    this.element.removeChild(sample);
    return w;
  }
  outputText() {
    let outputStr = "";
    let lineLength = 0;
    let firstLength = 0;
    let str = "";
    let w = this.getCharacterWidth();

    const maxVal = this.data
      .map(d => {
        if (!isNaN(d[1])) {
          return d[1] - 0; // type change to number
        }
      })
      .reduce((acc, curr) => {
        if (curr && !isNaN(curr)) {
          return curr > acc ? curr : acc;
        } else {
          return acc || 0;
        }
      }, 0);
    console.log("render method : ", this.options.renderMethod);
    this.data.map((d, index) => {
      // Check if the tuple is possible number value, i.e. Not the header string or empty error
      if (!isNaN(d[1])) {
        str = d[0];
        // if (index === 1) {
        // } else {
        //   firstLength = 0;
        // }
        // if (index % 2) {
        //   firstLength = str.slice(0, str.indexOf(" ")).length * w / 2;
        // } else {
        //   firstLength = 0;
        // }
        // outputStr += `<span class="tuple tuple-${
        //   index % 2 ? "odd" : "even"
        // }" style=background-color:${this.getHSLHueValue(
        //   d[1],
        //   maxVal
        // )};margin-left:-${firstLength}px>${d[0]}</span>`;
        outputStr += `<span class="tuple tuple-${
          index % 2 ? "odd" : "even"
        }" style=background-color:${this.options.renderMethod(
          d[1],
          maxVal
        )}; data-value=${d[1]}>${d[0]}</span>`;
      }
    });
    this.element.innerHTML = outputStr;
  }
}
