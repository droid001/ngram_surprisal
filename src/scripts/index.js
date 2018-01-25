"use strict";

if (module.hot) {
  module.hot.accept();
}

import "babel-polyfill";
// import tsvLoader from "tsv-loader";
import NgramWriter from "./ngramwriter";
import "../styles/index.scss";
// import file from "../public/martin_surprisal.txt"; // Relative to ./src/scripts/index.js
// console.log("file : ", file);
import data from "../public/martin_surprisal.tsv";

(function() {
  // let FILE_URL = "http://localhost:1337/martin_surprisal.txt";

  // console.log("data : ", data);
  const writer = new NgramWriter(document.getElementsByClassName("output")[0]);
  writer.setData(data);
  // tsvLoader(data)
  //   .then(d => {
  //     console.log(d);
  //   })
  //   .catch(err => {
  //     console.warn("ERROR : ", err);
  //   });
  // https://stackoverflow.com/questions/7431268/how-to-read-data-from-csv-file-using-javascript#12289296
  // fetch(FILE_URL).then(
  //   function(res) {
  //     // res instanceof Response == true.
  //     if (res.ok) {
  //       res.json().then(function(data) {
  //         console.log(data);
  //       });
  //     } else {
  //       console.log(
  //         "Looks like the response wasn't perfect, got status",
  //         res.status
  //       );
  //     }
  //   },
  //   function(e) {
  //     console.log("Fetch failed!", e);
  //   }
  // );
})();
