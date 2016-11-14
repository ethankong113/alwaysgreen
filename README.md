## Stock Analyzer with D3

### Background
Stock Analysis is a web app using D3 to show prices, financial ratios and other important metrics for a stock.

### Functionality & MVP
- [ ] Choose from 5 to 10 stocks (due to a limitation of good data/free api)
- [ ] Users can see different graphs for different ratios/metrics

In addition, this project will include:

- [ ] An About modal describing the background and how to use the tool
- [ ] A production Readme

### Architecture and Technologies
- Vanilla JavaScript and jQuery for the overall structure
- D3 for data visualization
- NodeJS with Express for API calls and simple data manipulation

### Implementation Timeline

**Day 1**: Set up all necessary NodeJS and Express. Create `webpack.config.js` as well as `package.json`. Write a basic entry file. Learn the basics of D3.js.

- Get a green bundle with `webpack`
- Learn enough `D3.js` to render a graph on the page

**Day 2**: Collect enough data and build the calculations for at least 5 stocks

- Collect .csv files and/or free API to get the necessary data.
- Turn the calculations into JavaScript code

**Day 3**: Turn the calculations into graphs with D3

- Let users choose between different stocks

**Day 4**: Style the frontend and make it look professional

- More refinement on D3 and CSS
- Finish productment readme

### Bonus features

- [ ] Allow users to customize their page with different graphs
- [ ] Add more stocks
