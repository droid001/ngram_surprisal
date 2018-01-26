"use strict";

if (module.hot) {
  module.hot.accept();
}

import "babel-polyfill";
import tsvLoader from "tsv-loader";
import papaparse from "papaparse";
import NgramWriter from "./ngramwriter";
import "../styles/index.scss";
import data from "../data/sample.tsv"; // Relative to ./src/scripts/index.js
// console.log("file : ", file);

(function() {
  // let FILE_URL = "http://localhost:1337/martin_surprisal.txt";
  let ID_FILE_INPUT = "fileinput";

  const writer = new NgramWriter(document.getElementsByClassName("output")[0]);
  writer.setSampleData(data); // set sample file

  let onFileChange = function(e) {
    let files = e.target.files;
    if (files.length < 1 || files[0].size < 1) {
      return;
    }
    let file = files[0];
    const reader = new FileReader();

    papaparse.parse(file, {
      complete: results => {
        writer.setData(results.data);
      }
    });
    // reader.onload = e => {
    //   console.log("result : ", e);
    //   // writer.setData(e.target.result);
    // };
    // reader.onloadend = e => {
    //   console.log("end : ", e.target.result);
    // };
    // // reader.readAsArrayBuffer(file);
    // reader.readAsText(file);
  };
  let inputListener = document.addEventListener("change", onFileChange);
  // console.log("data : ", data);
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
