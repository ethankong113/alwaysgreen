export const fetchPriceHistory = (ticker, success, error) => {
  $.ajax({
    type: 'GET',
    url: `${ticker}/prices`,
    success,
    error
  });
};

export const fetchFundamentals = (ticker, success, error) => {
  $.ajax({
     type: 'GET',
     url: `${ticker}/fundamentals`,
     success,
     error
   });
};
