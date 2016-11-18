import * as d3 from 'd3';
import { merge } from 'lodash';

class BarGraph {
  constructor(data, timeframe, target, width = 450, height = 350, margin = 50) {
    this.data = data;
    this.drawGraph(data, timeframe, target, width, height, margin);
  }

  drawGraph(data, timeframe, target, width, height, margin) {
    let info = merge([], data);
    info.reverse();
    let valueMin = d3.min(info.map((datum)=> datum.value));
    let valueMax = d3.max(info.map((datum)=> datum.value));
    let valueMargin = valueMin * 1.5;
    let valueDomain = [valueMin - valueMargin, valueMax + valueMargin];
    let valueRange = [height - 50, 0];
    let scaleValue = this._scaleValue(valueDomain, valueRange);
    let dateRange = [0, width - 50];
    let scaleNull = d3.scaleLinear().domain([0,0]).range(dateRange);
    $(`.${target}`).empty().append(`<div class=\"${target}-chart\"></div>`);
    let svg = d3.select(`.${target}-chart`).append('svg').attr('width', width).attr('height', height);
    let rects = svg.append('g').selectAll('rect').data(info);
    rects.enter().append('rect').attr("fill", "#1976D2").attr('width', width/(info.length * 4)).attr('height', (d)=>{return height - scaleValue(d.value) - margin;})
          .attr('x', (d, i) => this._getPosX(d, i, width, margin, info.length))
          .attr('y', (d) => scaleValue(d.value));
    svg.append('g').selectAll('text').data(info).enter().append('text').text((d)=> {
      if (target === "profitmargin") {
        return `${d.value}%`;
      } else {
        return `$${d.value}`;
      }
    }).attr('x', (d,i) => this._getPosX(d, i, width, margin, info.length) - 10)
      .attr('y', (d) => scaleValue(d.value)-margin/4);
    svg.append('g').selectAll('text').data(info).enter().append('text').text((d, i) => {
      return this._timeLabel(d.date, timeframe);
    }).attr('x', (d,i) => this._getPosX(d, i, width, margin, info.length) - 10)
      .attr('y', (d) => height-margin/4);
    let xAxis = d3.axisBottom(scaleNull).ticks(8);
    this._createAxis(svg, xAxis, 'axis x-axis', margin, height - margin);
    let yAxis = d3.axisLeft(scaleValue).ticks(5);
    this._createAxis(svg, yAxis, 'axis y-axis', margin, 0);
  }

  _getPosX(d, i, width, margin, length) {
    let pos = i * width/(length * 1.5) + margin * 2;
    return pos;
  }

  _scaleValue(domain, range) {
    return d3.scaleLinear().domain(domain).range(range);
  }

  _createAxis(parent, Axis, className, translateX, translateY) {
    parent.append("g").attr('class', className).attr('transform', `translate(${translateX}, ${translateY})`).call(Axis);
  }

  _timeLabel(date, timeframe) {
    if (timeframe == "Q") {
        let str = date.split("-");
        let year = str[0];
        let month = parseInt(str[1]);
        let day = str[2];
        return `${year.slice(2)}Q${Math.ceil(month/3)}`;
    } else {
      return date;
    }
  }
}

export default BarGraph;
