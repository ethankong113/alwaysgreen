import * as d3 from 'd3';
import * as _ from '../utils/helpers';
import { createDate } from '../utils/helpers';

class Sales {
  constructor(data, target, width = 450, height = 350, margin = 50) {
    this.data = data;
    this.drawGraph(data, target, width, height, margin);
  }

  drawGraph(data, target, width, height, margin) {
    let info = data.reverse();
    let valueMin = d3.min(info.map((datum)=> datum.value));
    let valueMax = d3.max(info.map((datum)=> datum.value));
    let valueMargin = valueMin * 0.25;
    let valueDomain = [valueMin - valueMargin, valueMax + valueMargin];
    let valueRange = [height - 50, 0];
    let scaleValue = this._scaleValue(valueDomain, valueRange);
    let dateRange = [0, width - 50];
    let scaleNull = d3.scaleLinear().domain([0,0]).range(dateRange);
    $(`.${target}`).empty().append(`<div class=\"${target}-chart\"></div>`);
    let svg = d3.select('.sales-chart').append('svg').attr('width', width).attr('height', height);
    let rects = svg.append('g').selectAll('rect').data(info);
    rects.enter().append('rect').attr("fill", "green").attr('width', width/(info.length * 4)).attr('height', (d)=>{return height - scaleValue(d.value)})
          .attr('x', (d, i) => this._getPosX(d, i, width, margin, info.length))
          .attr('y', (d) => scaleValue(d.value)-30)
    svg.selectAll('text').data(info).enter().append('text').text((d)=> `$${d.value}`)
        .attr('x', (d,i) => this._getPosX(d, i, width, margin, info.length) - 10)
        .attr('y', (d) => scaleValue(d.value)-35);
    let xAxis = d3.axisBottom(scaleNull).ticks(8);
    this._createAxis(svg, xAxis, 'axis x-axis', margin, 320);
    let yAxis = d3.axisLeft(scaleValue).ticks(5);
    this._createAxis(svg, yAxis, 'axis y-axis', margin, 20);
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
}

export default Sales;
