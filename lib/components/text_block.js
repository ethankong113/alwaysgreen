export const salesText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value;
  let endingQtValue = dataByQ[0].value;
  let startingQt = dataByQ[dataByQ.length - 1].date;
  let endingQt = dataByQ[0].date;
  let totalIncreaseByQ = endingQtValue - startingQtValue;
  let trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease";
  let percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value;
  let endingYearValue = dataByY[0].value;
  let startingYear = dataByY[dataByY.length - 1].date;
  let endingYear = dataByY[0].date;
  let totalIncreaseByY = endingYearValue - startingYearValue;
  let trendByY = totalIncreaseByY > 0 ? "increase" : "decrease";
  let percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100);
  let cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly sales has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a sales of $${endingQtValue}M for the quarter ending on ${endingQt}.
    ${company}'s yearly sales has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${totalIncreaseByY}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};

export const grossprofitText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value;
  let endingQtValue = dataByQ[0].value;
  let startingQt = dataByQ[dataByQ.length - 1].date;
  let endingQt = dataByQ[0].date;
  let totalIncreaseByQ = endingQtValue - startingQtValue;
  let trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease";
  let percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value;
  let endingYearValue = dataByY[0].value;
  let startingYear = dataByY[dataByY.length - 1].date;
  let endingYear = dataByY[0].date;
  let totalIncreaseByY = endingYearValue - startingYearValue;
  let trendByY = totalIncreaseByY > 0 ? "increase" : "decrease";
  let percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100);
  let cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly gross profit has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a gross profit of $${endingQtValue}M for the quarter ending on ${endingQt}.
    \n\n${company}'s yearly gross profit has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${totalIncreaseByY}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};

export const ebitdaText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value;
  let endingQtValue = dataByQ[0].value;
  let startingQt = dataByQ[dataByQ.length - 1].date;
  let endingQt = dataByQ[0].date;
  let totalIncreaseByQ = endingQtValue - startingQtValue;
  let trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease";
  let percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value;
  let endingYearValue = dataByY[0].value;
  let startingYear = dataByY[dataByY.length - 1].date;
  let endingYear = dataByY[0].date;
  let totalIncreaseByY = endingYearValue - startingYearValue;
  let trendByY = totalIncreaseByY > 0 ? "increase" : "decrease";
  let percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100);
  let cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly EBITDA (Earnings Before Interest, Tax, Depreciation, and Amortization) has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a EBITDA of $${endingQtValue}M for the quarter ending on ${endingQt}.
    \n\n${company}'s yearly EBITDA has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${totalIncreaseByY}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};


export const netincomeText = (company, ticker, dataByQ, dataByY) => {
  let startingQtValue = dataByQ[dataByQ.length - 1].value;
  let endingQtValue = dataByQ[0].value;
  let startingQt = dataByQ[dataByQ.length - 1].date;
  let endingQt = dataByQ[0].date;
  let totalIncreaseByQ = endingQtValue - startingQtValue;
  let trendByQ = totalIncreaseByQ > 0 ? "increase" : "decrease";
  let percentIncreaseByQ = Math.round((endingQtValue / startingQtValue - 1)  * 100);

  let startingYearValue = dataByY[dataByY.length - 1].value;
  let endingYearValue = dataByY[0].value;
  let startingYear = dataByY[dataByY.length - 1].date;
  let endingYear = dataByY[0].date;
  let totalIncreaseByY = endingYearValue - startingYearValue;
  let trendByY = totalIncreaseByY > 0 ? "increase" : "decrease";
  let percentIncreaseByY = Math.round((endingYearValue / startingYearValue - 1)  * 100);
  let cagr = Math.round((Math.pow(endingYearValue / startingYearValue, 1/(dataByY.length)) - 1) * 100);

  return (
    `${company}'s quarterly net income has been ${trendByQ.slice(0, trendByQ.length-1)}ing over the past ${dataByQ.length} quarters,
    with a net income of $${endingQtValue}M for the quarter ending on ${endingQt}.
    \ ${company}'s yearly net income has been ${trendByY.slice(0, trendByY.length-1)}ing over the past ${dataByY.length} years,
    for a total of $${totalIncreaseByY}M. The % rise over 4 years is ${percentIncreaseByY}% and the CAGR is ${cagr}%.`
  );
};
