let http = require('http');
let express = require('express');
let path = require('path');
let app = express();
let fs = require('fs');
let readCSV = require('./spider.js');

app.use(express.static(path.join(__dirname, '../client/assets')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/:ticker/prices', (req, res) => {
  let ticker = req.params.ticker;
  fs.readFile(path.join(__dirname, `../data/${ticker}/prices.json`), 'utf8', (err, data) => {
    if (err) throw err;
    let raw = JSON.parse(data).dataset.data;
    let info = raw.map((datum)=> {
      return {
        date: datum[0],
        price: datum[11],
        vol: datum[12]
      };
    });
    res.json(info);
  });
});

app.get('/:ticker/fundamentals', (req, res) => {
  let ticker = req.params.ticker;
  readCSV(ticker, (data) => {res.json(data);});
});

app.listen(8008, ()=>{
  console.log("Listening.");
});
