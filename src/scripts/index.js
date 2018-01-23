'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import tsvLoader from 'tsv-loader';
import '../styles/index.scss';

(function () {

let FILE_URL = "martin_surprisal.txt";

console.log("tsvLoader : " , tsvLoader);
// tsvLoader(FILE_URL)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.warn(err);
//   });
fetch(FILE_URL).then(function(res) {
    // res instanceof Response == true.
    if (res.ok) {
      res.json().then(function(data) {
        console.log(data);
      });
    } else {
      console.log("Looks like the response wasn't perfect, got status", res.status);
    }
  }, function(e) {
    console.log("Fetch failed!", e);
  });

})();
