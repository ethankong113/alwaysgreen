function Store() {

  let data = {
    ticker: null,
    company: null,
    priceHistory: [],
    salesByQ: [],
    grossprofitByQ: [],
    profitmarginByQ: [],
    netincomeByQ: [],
    epsByQ: [],
    salesByY: [],
    grossprofitByY: [],
    profitmarginByY: [],
    netincomeByY: [],
    epsByY: []
  };

  return {
    read: function (field) {
      return data[field];
    },
    readAll: function() {
      return data;
    },
    update: function (field, newValue) {
      data[field] = newValue;
      if (field == 'grossprofitByQ' && data.salesByQ.length != 0) {
        let margins = newValue.map((margin, i) => ({date: margin.date, value: Math.round(margin.value/data.salesByQ[i].value * 100)/100}));
        this.update("profitmarginByQ", margins);
      } else if (field == 'salesByQ' && data.grossprofitByQ.length != 0) {
        let margins = newValue.map((margin, i) => ({date: margin.date, value: Math.round(data.grossprofitByQ[i].value/value.value*100)/100}));
        this.update("profitmarginByQ", margins);
      } else if (field == 'grossprofitByY' && data.salesByY.length != 0) {
        let margins = newValue.map((margin, i) => ({date: margin.date, value: Math.round(margin.value/data.salesByY[i].value * 100)/100}));
        this.update("profitmarginByY", margins);
      } else if (field == 'salesByY' && data.grossprofitByY.length != 0) {
        let margins = newValue.map((margin, i) => ({date: margin.date, value: Math.round(data.grossprofitByY[i].value/value.value*100)/100}));
        this.update("profitmarginByY", margins);
      }
      return data[field];
    },
    isEmpty: function (field) {
      return data[field].length === 0;
    },
    emptyStore: function() {
      let keys = Object.keys(data);
      keys.forEach((key)=> {
        if (data[key] instanceof Array) {
          data[key] = [];
        } else {
          data[key] = null;
        }
      });
      return data;
    }
  };
}

export default Store;
