import * as d3 from 'd3';
import * as _ from '../utils/helpers';

class PriceHistory {
  constructor(data, dateCount) {
    this.data = data;
    this.dateCount = dateCount;
    this.drawGraph(data, dateCount);
  }

  drawGraph(data, dateCount) {
    let info = data.slice(0,dateCount).reverse();
    let priceDomain = d3.extent(info.map((datum)=>datum.price));
    let priceRange = [600, 0];
    let scalePrice = this._scalePrice(priceDomain, priceRange);
    let dateDomain = [_.createDate(info[0].date), _.createDate(info[info.length-1].date)];
    let dateRange = [0, 800];
    let scaleDate = this._scaleDate(dateDomain, dateRange);
    let line = d3.line().x((d, i) => scaleDate(_.createDate(d.date))).y((d) => scalePrice(d.price));
    $('.price-histroy').empty().append("<div class=\"price-history-chart\"></div>");
    let svg = d3.select('.price-history-chart').append('svg').attr('width', 900).attr('height', 700);
    let path = svg.append('g').selectAll("path").data([info]);
    path.enter().append("path").attr("d", line)
      .attr('fill', 'none').attr('stroke', 'red').attr('stroke-width', 2).attr('transform', 'translate(50, 50)');
    let xAxis = d3.axisBottom(scaleDate).ticks(8);
    this._createAxis(svg, xAxis, 'axis x-axis', 50, 650);
    let yAxis = d3.axisLeft(scalePrice).ticks(5);
    this._createAxis(svg, yAxis, 'axis y-axis', 50, 50);
  }

  _scalePrice(domain, range) {
    return d3.scaleLinear().domain(domain).range(range);
  }

  _scaleDate(domain, range) {
    return d3.scaleTime().domain(domain).range(range);
  }

  _createAxis(parent, Axis, className, translateX, translateY) {
    parent.append("g").attr('class', className).attr('transform', `translate(${translateX}, ${translateY})`).call(Axis);
  }

}

export default PriceHistory;
