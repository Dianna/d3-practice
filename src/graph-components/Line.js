import React, { Component } from "react";

import { select, selectAll } from "d3-selection";
import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { Button } from "react-bootstrap";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLine: true,
      dataSets: props.dataSets,
      xDomain: props.xDomain,
      yDomain: props.yDomain,
      width: props.width,
      height: props.height,
      margin: props.margin
    };
  }

  componentDidMount() {
    this.drawLineGraph();
  }

  drawLineGraph = () => {
    const { dataSets, xDomain, yDomain, width, height, margin } = this.state;
    const axisLength = width - 2 * margin;

    const svgContainer = select(".js-line-graph")
      .append("svg")
      .classed("line-graph", true)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid");

    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, axisLength]);

    const yScale = scaleLinear()
      .domain(yDomain)
      .range([0, axisLength]);

    this.setState(
      prevState => ({
        ...prevState,
        xScale: xScale,
        yScale: yScale
      }),
      () => {
        this.drawAxes(svgContainer);
        for (let i = 0; i < dataSets.length; i++) {
          const { data, color } = dataSets[i];
          this.drawLine(svgContainer, data, color);
        }
      }
    );
  };

  drawAxes = svgContainer => {
    const { xScale, yScale, height, margin } = this.state;
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svgContainer
      .append("g")
      .classed("x-axis", true)
      .attr("transform", function() {
        return `translate(${margin}, ${height - margin})`;
      })
      .call(xAxis);

    svgContainer
      .append("g")
      .classed("y-axis", true)
      .attr("transform", function() {
        return `translate(${margin}, ${margin})`;
      })
      .call(yAxis);
  };

  drawLine = (svgContainer, data, color) => {
    const { xScale, yScale, margin } = this.state;
    const curve = this.state.isLine ? shape.curveLinear : shape.curveCardinal;

    const line = shape
      .line()
      .x(function(d) {
        return xScale(d.x);
      })
      .y(function(d) {
        return yScale(d.y);
      })
      .curve(curve);

    svgContainer
      .append("path")
      .classed("line shape", true)
      .attr("d", line(data))
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("transform", function() {
        return `translate(${margin}, ${margin})`;
      });
  };

  interpolate = () => {
    const { dataSets } = this.state;
    const svgContainer = select(".line-graph");

    selectAll(".line.shape").remove();

    this.setState(
      prevState => ({
        ...prevState,
        isLine: !prevState.isLine
      }),
      () => {
        for (let i = 0; i < dataSets.length; i++) {
          const { data, color } = dataSets[i];
          this.drawLine(svgContainer, data, color);
        }
      }
    );
  };

  render() {
    return (
      <div>
        <div className="js-line-graph" />
        <Button onClick={this.interpolate}>
          {this.state.isLine ? "Cardinal" : "Line"}
        </Button>
      </div>
    );
  }
}

export default LineGraph;
