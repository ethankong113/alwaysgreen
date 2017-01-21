import $ from "jquery";
import * as d3 from 'd3';
import * as _ from './utils/helpers';
import store from './store.js';
import PriceHistory from './components/price_history';
import Sales from './components/sales';
import { fetchPriceHistory, fetchFundamentals } from './utils/api';
import MasterReducer from './reducers/master_reducer';
import { drawSales, drawGrossprofit, drawProfitmargin, drawEbitda, drawNetincome, drawEPS } from './reducers/fundamentals_reducer';
import { salesText, grossprofitText, profitmarginText, ebitdaText, netincomeText, epsText } from './components/text_block';


$(function() {
  // window.Store = Store;
  $(window).on('scroll', (e)=> {
    let posY = window.scrollY;
    let target = $('.main')[0].offsetTop;
    let margin = $('.header h1').height();
    let top = parseInt($('.header h1').css('margin-top').split("p")[0]);
    if (posY + margin + 90 > target && top > -50) {
      $('.header h1').css('margin-top', `${top-10}px`);
    } else if (posY + margin + 90 < target) {
      $('.header h1').css('margin-top', '20px');
    }
  });
  let fundamentals = ["sales", "grossprofit", "profitmargin", "ebitda", "netincome", "eps"];
  let timeframes = ["year", "quarter"];
  Store.update("ticker", "FB");
  Store.update("company", "Facebook");
  fetchPriceHistory('FB', drawPriceHistory(20), errorCB);
  fetchFundamentals('FB', (data)=>{
    drawFundamentals('Q', ()=>{MasterReducer(Store);})(data);
    $('.sales-text').text(salesText(Store.read("company"), Store.read("ticker"), Store.read("salesByQ"), Store.read("salesByY")));
    $('.grossprofit-text').text(grossprofitText(Store.read("company"), Store.read("ticker"), Store.read("grossprofitByQ"), Store.read("grossprofitByY")));
    $('.profitmargin-text').text(profitmarginText(Store.read("company"), Store.read("ticker"), Store.read("profitmarginByQ"), Store.read("profitmarginByY")));
    $('.netincome-text').text(netincomeText(Store.read("company"), Store.read("ticker"), Store.read("netincomeByQ"), Store.read("netincomeByY")));
    $('.ebitda-text').text(ebitdaText(Store.read("company"), Store.read("ticker"), Store.read("ebitdaByQ"), Store.read("ebitdaByY")));
    $('.eps-text').text(epsText(Store.read("company"), Store.read("ticker"), Store.read("epsByQ"), Store.read("epsByY")));
  }, errorCB);

  $('.ticker-btn').click((e)=> {
    let ticker = $(e.target).data('ticker');
    let savedTicker = Store.read("ticker");
    if (!savedTicker || savedTicker != ticker) {
      Store.emptyStore();
      savedTicker = Store.update("ticker", ticker);
      Store.update("company", $(e.target)[0].innerText);
      fetchPriceHistory(savedTicker, drawPriceHistory(20), errorCB);
      fetchFundamentals(savedTicker, (data)=>{
        drawFundamentals('Q', ()=>{MasterReducer(Store);})(data);
        $('.sales-text').text(salesText(Store.read("company"), Store.read("ticker"), Store.read("salesByQ"), Store.read("salesByY")));
        $('.grossprofit-text').text(grossprofitText(Store.read("company"), Store.read("ticker"), Store.read("grossprofitByQ"), Store.read("grossprofitByY")));
        $('.profitmargin-text').text(profitmarginText(Store.read("company"), Store.read("ticker"), Store.read("profitmarginByQ"), Store.read("profitmarginByY")));
        $('.netincome-text').text(netincomeText(Store.read("company"), Store.read("ticker"), Store.read("netincomeByQ"), Store.read("netincomeByY")));
        $('.ebitda-text').text(ebitdaText(Store.read("company"), Store.read("ticker"), Store.read("ebitdaByQ"), Store.read("ebitdaByY")));
        $('.eps-text').text(epsText(Store.read("company"), Store.read("ticker"), Store.read("epsByQ"), Store.read("epsByY")));
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

  $('.about-btn').click((e)=>{
    $('.modal').css('visibility', 'visible');
    $('body').css('overflow', 'hidden');
  });

  $('.close-btn').click((e)=>{
    e.stopPropagation();
    $('.modal').css('visibility', 'hidden');
    $('body').css('overflow', 'auto');
  });

  $('.modal-frame .modal-content').click((e)=> {
    e.stopPropagation();
  });

  $('.modal').click((e)=>{
    $('.modal').css('visibility', 'hidden');
    $('body').css('overflow', 'auto');
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
    callback();
  };
}

function errorCB(err) {
  console.log(err);
}

const Store = store();

class SalesHistory {

}
