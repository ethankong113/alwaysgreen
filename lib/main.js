import $ from "jquery";
import * as d3 from 'd3';
import * as _ from './utils/helpers';
import store from './store.js';
import PriceHistory from './components/price_history';
import Sales from './components/sales';
import { fetchPriceHistory, fetchFundamentals } from './utils/api';
import MasterReducer from './reducers/master_reducer';
import { drawSales, drawGrossprofit, drawProfitmargin, drawEbitda, drawNetincome, drawEPS } from './reducers/fundamentals_reducer';
import { salesText, grossprofitText, profitmarginText, ebitdaText, netincomeText, epsText, generateText } from './components/text_block';
import createModal from './components/modal';
import dynamicHeader from './utils/dynamic_header';

const Store = store();

$(function() {
  // window.Store = Store;
  createModal();
  dynamicHeader();

  const fundamentals = ["sales", "grossprofit", "profitmargin", "ebitda", "netincome", "eps"];
  const timeframes = ["year", "quarter"];

  (function defaultTicker(ticker, name) {
    Store.update("ticker", ticker);
    Store.update("company", name);
    fetchPriceHistory('FB', drawPriceHistory(20), errorCB);
    fetchFundamentals('FB', (data)=>{
      drawFundamentals('Q', ()=>{MasterReducer(Store);})(data);
      generateText(Store);
    }, errorCB);
    $('#fb-btn').addClass('btn-active');
  })("FB", "Facebook");

  $('.ticker-btn').click((e)=> {
    $('.ticker-btn').removeClass('btn-active');
    $(e.target).addClass('btn-active');
    let ticker = $(e.target).data('ticker');
    let savedTicker = Store.read('ticker');
    if (!savedTicker || savedTicker !== ticker) {
      Store.emptyStore();
      savedTicker = Store.update("ticker", ticker);
      Store.update("company", $(e.target)[0].innerText);
      fetchPriceHistory(savedTicker, drawPriceHistory(20), errorCB);
      fetchFundamentals(savedTicker, (data)=>{
        drawFundamentals('Q', ()=>{MasterReducer(Store);})(data);
        generateText(Store);
      }, errorCB);
    }
  });

  $('.price-history-option').click((e) => {
    let option = parseInt($(e.target)[0].dataset["datecount"]);
    drawPriceHistory(option)();
  });
  fundamentals.forEach((f) => {
    timeframes.forEach((t) => {
      $(`.${f}-option-${t}`).click((e)=>{
        let period = t === "year" ? "Y" : "Q";
        const {read} = Store;
        switch(f) {
          case "sales":
            drawSales(read(`${f}By${period}`), period);
            break;
          case "grossprofit":
            drawGrossprofit(read(`${f}By${period}`), period);
            break;
          case "profitmargin":
            drawProfitmargin(read(`${f}By${period}`), period);
            break;
          case "ebitda":
            drawEbitda(read(`${f}By${period}`), period);
            break;
          case "netincome":
            drawNetincome(read(`${f}By${period}`), period);
            break;
          case "eps":
            drawEPS(read(`${f}By${period}`), period);
            break;
          default:
            break;
        }
      });
    });
  });
});

function drawPriceHistory(dateCount) {
  const {update, read} = Store;
  return (data = read("priceHistory")) => {
    update("priceHistory", data);
    new PriceHistory(read("priceHistory"), dateCount);
  };
}

function drawSalesByQ(timeframe) {
  const {update, read} = Store;
  return (data = read("salesByQ")) => {
    update("salesByQ", data);
    new PriceHistory(read("salesByQ"), timeframe);
  };
}

function drawFundamentals(timeframe, callback) {
  return (data) => {
    let keys = Object.keys(data);
    keys.forEach((key)=>{
      Store.update(key, data[key]);
    });
    callback();
  };
}

function errorCB(err) {
  console.log(err);
}
