export default class NgramWriter {
  constructor(element) {
    if (!element) {
      console.log("No data given.");
      return;
    }
    this.element = element;
    this._data = [];
  }
  get data() {
    return this._data;
  }
  set data(val) {
    if (isNaN(val[0][1])) {
      val.shift(); //remove the header
    }
    this._data = val;
  }
  setData(data) {
    if (!data) {
      console.warn("no data was set");
      return;
    }
    this.data = data;
    this.outputText();
  }
  getRGBColorVal(curr, max) {
    const q = curr / max;
    return `rgb(${255 * q},${255 * q},${255 * q})`;
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
  outputText() {
    let outputStr = "";
    const maxVal = this.data
      .map(d => {
        if (!isNaN(d[1])) {
          return d[1] - 0; // type change to number
        }
      })
      .reduce((acc, curr) => {
        // console.log("curr : ", curr, " acc : ", acc);
        if (curr && !isNaN(curr)) {
          return curr > acc ? curr : acc;
        } else {
          return acc || 0;
        }
      }, 0);
    console.log("max : ", maxVal);

    this.data.map((d, index) => {
      // Check if the tuple is possible number value, i.e. Not the header string
      if (!isNaN(d[1])) {
        outputStr += `<span class="tuple tuple-${
          index % 2 ? "odd" : "even"
        }" style=background-color:${this.getRGBColorVal(d[1], maxVal)}>${
          d[0]
        }</span>`;
      }
    });
    this.element.innerHTML = outputStr;
  }
}
