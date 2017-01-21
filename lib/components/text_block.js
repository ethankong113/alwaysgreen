import { getValues, getQuarter, formatNumber } from '../utils/helpers';

export const salesText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value, endingQtValue = dataByQ[0].value, startingQt = dataByQ[dataByQ.length - 1].date,
  endingQt = dataByQ[0].date, totalIncreaseByQ = endingQtValue - startingQtValue, trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease",
  percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value, endingYearValue = dataByY[0].value, startingYear = dataByY[dataByY.length - 1].date,
  endingYear = dataByY[0].date, totalIncreaseByY = endingYearValue - startingYearValue, trendByY = totalIncreaseByY > 0 ? "increase" : "decrease",
  percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100), cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly sales has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a sales of $${formatNumber(endingQtValue)}M for the quarter ending on ${endingQt}.
    ${company}'s yearly sales has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${formatNumber(totalIncreaseByY)}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};

export const grossprofitText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value, endingQtValue = dataByQ[0].value, startingQt = dataByQ[dataByQ.length - 1].date,
  endingQt = dataByQ[0].date, totalIncreaseByQ = endingQtValue - startingQtValue, trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease",
  percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value, endingYearValue = dataByY[0].value, startingYear = dataByY[dataByY.length - 1].date,
  endingYear = dataByY[0].date, totalIncreaseByY = endingYearValue - startingYearValue, trendByY = totalIncreaseByY > 0 ? "increase" : "decrease",
  percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100), cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly gross profit has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a gross profit of $${formatNumber(endingQtValue)}M for the quarter ending on ${endingQt}.
    \n\n${company}'s yearly gross profit has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${formatNumber(totalIncreaseByY)}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};

export const profitmarginText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value, endingQtValue = dataByQ[0].value, startingYearValue = dataByY[dataByY.length - 1].value,
  endingYearValue = dataByY[0].value, startingYear = dataByY[dataByY.length - 1].date, endingYear = dataByY[0].date, totalIncreaseByY = endingYearValue - startingYearValue,
  trendByY = totalIncreaseByY > 0 ? "increase" : "decrease", rateByY = Math.abs(totalIncreaseByY) > 0.1 ? "significant" : "mild", avgByQ = dataByQ.reduce((p,c)=>p+c.value, 0)/dataByQ.length,
  isStable = avgByQ * 1.2 > Math.max(...getValues(dataByQ)) && avgByQ * 0.8 < Math.min(...getValues(dataByQ));
  return (
    `${company}'s profit margin has ${trendByY}d from ${startingYearValue * 100}% in ${startingYear} to
    ${endingYearValue * 100}% in ${endingYear}. The ${trendByY} in profit margin is ${rateByY}.
    The profit margin has been ${isStable ? "stable" : "fluctuating"} for the past ${dataByQ.length} quarters.`
  );
};

export const ebitdaText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value, endingQtValue = dataByQ[0].value, startingQt = dataByQ[dataByQ.length - 1].date,
  endingQt = dataByQ[0].date, totalIncreaseByQ = endingQtValue - startingQtValue, trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease",
  percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value, endingYearValue = dataByY[0].value, startingYear = dataByY[dataByY.length - 1].date,
  endingYear = dataByY[0].date, totalIncreaseByY = endingYearValue - startingYearValue, trendByY = totalIncreaseByY > 0 ? "increase" : "decrease",
  percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100), cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortization) has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a EBITDA of $${formatNumber(endingQtValue)}M for the quarter ending on ${endingQt}.
    \n\n${company}'s yearly EBITDA has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${formatNumber(totalIncreaseByY)}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};


export const netincomeText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value, endingQtValue = dataByQ[0].value, startingQt = dataByQ[dataByQ.length - 1].date,
  endingQt = dataByQ[0].date, totalIncreaseByQ = endingQtValue - startingQtValue, trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease",
  percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value, endingYearValue = dataByY[0].value, startingYear = dataByY[dataByY.length - 1].date,
  endingYear = dataByY[0].date, totalIncreaseByY = endingYearValue - startingYearValue, trendByY = totalIncreaseByY > 0 ? "increase" : "decrease",
  percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100), cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly net income has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a net income of $${formatNumber(endingQtValue)}M for the quarter ending on ${endingQt}.
    \ ${company}'s yearly net income has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${formatNumber(totalIncreaseByY)}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};

export const epsText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value, endingQtValue = dataByQ[0].value, startingQt = dataByQ[dataByQ.length - 1].date,
  endingQt = dataByQ[0].date, totalIncreaseByQ = endingQtValue - startingQtValue, trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease",
  percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value, endingYearValue = dataByY[0].value, startingYear = dataByY[dataByY.length - 1].date,
  endingYear = dataByY[0].date, totalIncreaseByY = endingYearValue - startingYearValue, trendByY = totalIncreaseByY > 0 ? "increase" : "decrease",
  percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100), cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100),
  isEpsPositive = endingQtValue > 0 ? true : false, rateByY = Math.abs(totalIncreaseByY) > 0.1 ? "significant" : "mild", avgByQ = dataByQ.reduce((p,c)=>p+c.value, 0)/dataByQ.length,
  max = Math.max(...getValues(dataByQ)),min = Math.min(...getValues(dataByQ)), isStable = avgByQ * 1.2 > max && avgByQ * 0.8 < min;

  return (
    `${company} is have a ${isEpsPositive ? "positive" : "negative"} EPS (Earnings Per Share)
    for the last quarter ${getQuarter(endingQt)}. It has ${trendByQ}d from $${startingQtValue} per share in ${getQuarter(startingQt)}
    to $${endingQtValue} per share in ${getQuarter(endingQt)}, representing a ${trendByQ === "increase" ? "rise" : "fall"}
    of ${percentIncreaseByQ}%.
    ${ticker.toUpperCase()}'s EPS has been ${isStable ? "stable" : trendByQ === "increase" ? "increasing significantly" : "fluctuating"} with a minimum of
    $${min} and a maximum of $${max}.`
  );
};

export const generateText = ({read}) => {
  $('.sales-text').text(salesText(read('company'), read('ticker'), read("salesByQ"), read("salesByY")));
  $('.grossprofit-text').text(grossprofitText(read('company'), read('ticker'), read("grossprofitByQ"), read("grossprofitByY")));
  $('.profitmargin-text').text(profitmarginText(read('company'), read('ticker'), read("profitmarginByQ"), read("profitmarginByY")));
  $('.netincome-text').text(netincomeText(read('company'), read('ticker'), read("netincomeByQ"), read("netincomeByY")));
  $('.ebitda-text').text(ebitdaText(read('company'), read('ticker'), read("ebitdaByQ"), read("ebitdaByY")));
  $('.eps-text').text(epsText(read('company'), read('ticker'), read("epsByQ"), read("epsByY")));
};
