import React, { Component } from "react";

import { select, selectAll } from "d3-selection";
import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { Button } from "react-bootstrap";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { isLine: true };
  }

  componentDidMount() {
    this.drawLineGraph();
  }

  drawLineGraph = () => {
    const { dataSets, xDomain, yDomain, width, height, margin } = this.props;
    const axisLength = width - 2 * margin;

    const svgContainer = select(".js-line-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid");

    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, axisLength]);

    const yScale = scaleLinear()
      .domain(yDomain)
      .range([0, axisLength]);

    this.drawAxes(svgContainer, xScale, yScale, height, margin);

    for (let i = 0; i < dataSets.length; i++) {
      const { data, color } = dataSets[i];
      this.drawLine(svgContainer, xScale, yScale, margin, data, color);
    }
  };

  drawAxes = (svgContainer, xScale, yScale, height, margin) => {
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

  drawLine = (svgContainer, xScale, yScale, margin, data, color) => {
    const curve = this.state.isLine ? "cardinal" : "linear";

    const line = shape
      .line()
      .x(function(d) {
        return xScale(d.x);
      })
      .y(function(d) {
        return yScale(d.y);
      });

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
    this.setState(prevState => ({
      ...prevState,
      isLine: !prevState.isLine
    }));

    selectAll(".line.shape").remove();
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
