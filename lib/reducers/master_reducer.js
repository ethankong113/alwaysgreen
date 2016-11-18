import { drawSales, drawGrossprofit, drawProfitmargin, drawEbitda, drawNetincome, drawEPS } from './fundamentals_reducer';


const MasterReducer = (store) => {
  let reducers = {
    salesByQ: (data)=>{drawSales(data, "Q");},
    grossprofitByQ: (data)=>{drawGrossprofit(data, "Q");},
    profitmarginByQ: (data)=>{drawProfitmargin(data, "Q");},
    ebitdaByQ: (data)=>{drawEbitda(data, "Q");},
    netincomeByQ: (data)=>{drawNetincome(data, "Q");},
    epsByQ: (data)=>{drawEPS(data, "Q");}
  };
  let keys = Object.keys(reducers);
  keys.forEach((key) => {
    reducers[key](store.read([key]));
  });
};

export default MasterReducer;
