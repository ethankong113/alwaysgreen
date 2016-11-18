import Sales from '../components/sales';
import BarGraph from '../components/bar_graph';

export const drawSales = (data, timeframe) => {
  new BarGraph(data, timeframe, "sales");
};

export const drawGrossprofit = (data, timeframe) => {
  new BarGraph(data, timeframe, "grossprofit");
};

export const drawProfitmargin = (data, timeframe) => {
  new BarGraph(data, timeframe, "profitmargin");
};

export const drawEbitda = (data, timeframe) => {
  new BarGraph(data, timeframe, "ebitda");
};

export const drawNetincome = (data, timeframe) => {
  new BarGraph(data, timeframe, "netincome");
};

export const drawEPS = (data, timeframe) => {
  new BarGraph(data, timeframe, "eps");
};
