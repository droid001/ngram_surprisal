"use strict";

if (module.hot) {
  module.hot.accept();
}

import "babel-polyfill";
import tsvLoader from "tsv-loader";
import "../styles/index.scss";
import file from "./martin_surprisal.txt";
console.log("file : ", file);
(function() {
  let FILE_URL = "http://localhost:1337/martin_surprisal.txt";

  tsvLoader(file)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.warn(err);
    });
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
