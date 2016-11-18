var fs = require('fs');
var path = require('path');
var { merge } = require('lodash');

function readCSV(ticker, callback) {
  let pathQ = path.join(__dirname, `../data/${ticker}/dataByQ.csv`);
  let pathY = path.join(__dirname, `../data/${ticker}/dataByY.csv`);
  return (fs.readFile(pathQ, 'utf8', (err, data) => {
    let lines = data.split("\n");
    lines = lines.slice(0,lines.length-1);
    let dates = lines[0].split(',').map((date) => {
      return date.replace(/[ \t]/g, "");
    });
    let output = {};
    lines.slice(1).forEach((line) => {
      let values = line.split(",").map((value) => {
        return value.replace(/[ \t]/g, "");
      });
      output[values[0]] = [];
      for (let i = 1; i < values.length; i++) {
        output[values[0]].push({date: dates[i], value: parseFloat(values[i])});
      }
    });
    console.log(data);
    console.log("----------");
    fs.readFile(pathY, 'utf8', (err2, data2) => {
      console.log(pathY);
      console.log(data2);
      let lines2 = data2.split("\n");
      lines2 = lines2.slice(0,lines2.length-1);
      let dates2 = lines2[0].split(',').map((date) => {
        return date.replace(/[ \t]/g, "");
      });
      let output2 = {};
      lines2.slice(1).forEach((line) => {
        let values = line.split(",").map((value) => {
          return value.replace(/[ \t]/g, "");
        });
        output2[values[0]] = [];
        for (let i = 1; i < values.length; i++) {
          output2[values[0]].push({date: dates2[i], value: parseFloat(values[i])});
        }

      });
      callback(merge({}, output, output2));
    });
  }));
}

module.exports = readCSV;
