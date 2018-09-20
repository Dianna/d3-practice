import React, { Component } from "react";

import { select } from "d3-selection";
import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";

class LineGraph extends Component {
  componentDidMount() {
    this.drawInitialGraph();
  }

  componentDidUpdate(prevProps) {
    const curveChange = prevProps.isLineCardinal !== this.props.isLineCardinal;
    const areaChange = prevProps.isAreaShown !== this.props.isAreaShown;

    if (curveChange || areaChange) {
      const { dataSets } = this.props;
      const svgContainer = select(this.refs.lineGraph).select("svg");

      this.removeData();

      for (let i = 0; i < dataSets.length; i++) {
        const { data, color } = dataSets[i];
        if (this.props.isAreaShown) {
          this.drawArea(svgContainer, data, color);
        } else {
          this.drawLine(svgContainer, data, color);
        }
      }
    }
  }

  drawInitialGraph = () => {
    const { dataSets } = this.props;
    // Create SVG container for graph
    const svgContainer = this.createSvgContainer();
    // Create Axes
    const { xScale, yScale } = this.drawAxes(svgContainer);
    // Save x- and y-scale of axes then graph data
    this.setState(
      () => ({
        xScale,
        yScale
      }),
      () => {
        for (let i = 0; i < dataSets.length; i++) {
          const { data, color } = dataSets[i];
          this.drawLine(svgContainer, data, color);
        }
      }
    );
  };

  // Appends svg container to .js-line-graph
  createSvgContainer = () => {
    const { width, height } = this.props;
    const svgContainer = select(this.refs.lineGraph)
      .append("svg")
      .classed("line-graph", true)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid");

    return svgContainer;
  };

  // Calculates xScale and yScale, appends xAxis and yAxis to svgContainer
  // Requires svgContainer to append axes to
  // Returns { xScale, yScale }
  drawAxes = svgContainer => {
    const { xDomain, yDomain, width, height, margin } = this.props;
    const axisLength = width - 2 * margin;

    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, axisLength]);
    const yScale = scaleLinear()
      .domain(yDomain)
      .range([0, axisLength]);

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

    return {
      xScale,
      yScale
    };
  };

  // Appends data representation to svgContainer
  // Requires svgContainer append to, data, and color for style
  drawLine = (svgContainer, data, color) => {
    const { xScale, yScale } = this.state;
    const { margin, isLineCardinal } = this.props;
    const curve = isLineCardinal ? shape.curveCardinal : shape.curveLinear;

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

  drawArea = (svgContainer, data, color) => {
    const { xScale, yScale } = this.state;
    const { margin, isLineCardinal } = this.props;
    const curve = isLineCardinal ? shape.curveCardinal : shape.curveLinear;

    const area = shape
      .area()
      .x(function(d) {
        return xScale(d.x);
      })
      .y0(function() {
        return yScale(0);
      })
      .y1(function(d) {
        return yScale(d.y);
      })
      .curve(curve);

    svgContainer
      .append("path")
      .classed("area shape", true)
      .attr("d", area(data))
      .attr("fill", color)
      .attr("stroke", color)
      .attr("transform", function() {
        return `translate(${margin}, ${margin})`;
      });
  };

  removeData = () => {
    select(this.refs.lineGraph)
      .selectAll(".line.shape")
      .remove();
    select(this.refs.lineGraph)
      .selectAll(".area.shape")
      .remove();
  };

  render() {
    return <div ref="lineGraph" />;
  }
}

export default LineGraph;
