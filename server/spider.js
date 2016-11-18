var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function readCSV(ticker, callback) {
  var pathQ = path.join(__dirname, `../data/${ticker}/dataByQ.csv`);
  var pathY = path.join(__dirname, `../data/${ticker}/dataByY.csv`);
  return (fs.readFile(pathQ, 'utf8', (err, data) => {
    console.log(err);
    console.log(data);
    var lines = data.split("\n");
    lines = lines.slice(0,lines.length-1);
    var dates = lines[0].split(',').map((date) => {
      return date.replace(/[ \t]/g, "");
    });
    var output = {};
    lines.slice(1).forEach((line) => {
      var values = line.split(",").map((value) => {
        return value.replace(/[ \t]/g, "");
      });
      output[values[0]] = [];
      for (var i = 1; i < values.length; i++) {
        output[values[0]].push({date: dates[i], value: parseFloat(values[i])});
      }
    });
    fs.readFile(pathY, 'utf8', (err2, data2) => {
      var lines2 = data2.split("\n");
      lines2 = lines2.slice(0,lines2.length-1);
      var dates2 = lines2[0].split(',').map((date) => {
        return date.replace(/[ \t]/g, "");
      });
      var output2 = {};
      lines2.slice(1).forEach((line) => {
        var values = line.split(",").map((value) => {
          return value.replace(/[ \t]/g, "");
        });
        output2[values[0]] = [];
        for (var i = 1; i < values.length; i++) {
          output2[values[0]].push({date: dates2[i], value: parseFloat(values[i])});
        }

      });
      callback(_.merge({}, output, output2));
    });
  }));
}

module.exports = readCSV;
