import $ from "jquery";
import * as d3 from 'd3';
import * as _ from './utils/helpers';
import store from './store.js';
import PriceHistory from './components/price_history';
import Sales from './components/sales';
import { fetchPriceHistory, fetchFundamentals } from './utils/api';
import MasterReducer from './reducers/master_reducer';
import { drawSales, drawGrossprofit, drawProfitmargin, drawEbitda, drawNetincome, drawEPS } from './reducers/fundamentals_reducer';

$(function() {
  window.Store = Store;
  fetchPriceHistory('FB', drawPriceHistory(20), errorCB);
  fetchFundamentals('FB', (data)=>{
    drawFundamentals('Q', ()=>{MasterReducer(Store);})(data);
  }, errorCB);

  $('.ticker-btn').click((e)=> {
    let ticker = $(e.target).data('ticker');
    let savedTicker = Store.read("ticker");
    if (!savedTicker || savedTicker != ticker) {
      Store.emptyStore();
      savedTicker = Store.update("ticker", ticker);
      fetchPriceHistory(savedTicker, drawPriceHistory(20), errorCB);
      fetchFundamentals(savedTicker, (data)=>{
        drawFundamentals('Q', ()=>{MasterReducer(Store);})(data);
      }, errorCB);
    }
  });

  $('.price-history-option').click((e) => {
    let option = parseInt($(e.target)[0].dataset["datecount"]);
    drawPriceHistory(option)();
  });

  let fundamentals = ["sales", "grossprofit", "profitmargin", "ebitda", "netincome", "eps"];
  let timeframes = ["year", "quarter"];
  fundamentals.forEach((f) => {
    timeframes.forEach((t) => {
      $(`.${f}-option-${t}`).click((e)=>{
        let period = t === "year" ? "Y" : "Q";
        switch(f) {
          case "sales":
            drawSales(Store.read(`${f}By${period}`), period);
            break;
          case "grossprofit":
            drawGrossprofit(Store.read(`${f}By${period}`), period);
            break;
          case "profitmargin":
            drawProfitmargin(Store.read(`${f}By${period}`), period);
            break;
          case "ebitda":
            drawEbitda(Store.read(`${f}By${period}`), period);
            break;
          case "netincome":
            drawNetincome(Store.read(`${f}By${period}`), period);
            break;
          case "eps":
            drawEPS(Store.read(`${f}By${period}`), period);
            break;
          default:
            break;
        }
      });
    });
  });
});

function drawPriceHistory(dateCount) {
  return (data = Store.read("priceHistory")) => {
    Store.update("priceHistory", data);
    new PriceHistory(Store.read("priceHistory"), dateCount);
  };
}

function drawSalesByQ(timeframe) {
  return (data = Store.read("salesByQ")) => {
    Store.update("salesByQ", data);
    new PriceHistory(Store.read("salesByQ"), timeframe);
  };
}

function drawFundamentals(timeframe, callback) {
  return (data) => {
    let keys = Object.keys(data);
    keys.forEach((key)=>{
      Store.update(key, data[key]);
    });
    callback()
  };
}

function errorCB(err) {
  console.log(err);
}

const Store = store();

class SalesHistory {

}
