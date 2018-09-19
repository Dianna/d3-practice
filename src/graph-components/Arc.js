import React, { Component } from "react";

import { select } from "d3-selection";
import * as shape from "d3-shape";

class ArcGraph extends Component {
  componentDidMount() {
    this.drawInitialGraph();
  }

  drawInitialGraph = () => {
    // Create SVG container for graph
    const svgContainer = this.createSvgContainer();
    this.drawArea(svgContainer);
  };

  // Appends svg container to .js-line-graph
  createSvgContainer = () => {
    const { width, height } = this.props;
    const svgContainer = select(".js-arc-graph")
      .append("svg")
      .classed("arc-graph", true)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid");

    return svgContainer;
  };

  drawArea = svgContainer => {
    const fullAngle = 2 * Math.PI;
    // Draw example 1
    const arc1 = shape
      .arc()
      .innerRadius(0)
      .outerRadius(100)
      .startAngle(0)
      .endAngle(fullAngle / 4);

    svgContainer
      .append("g")
      .append("path")
      .attr("d", arc1())
      .attr("fill", "red")
      .attr("transform", `translate(${250}, ${200})`);

    // Draw example 2
    const arc2 = shape
      .arc()
      .innerRadius(50)
      .outerRadius(100)
      .startAngle(0)
      .endAngle(fullAngle);

    svgContainer
      .append("g")
      .append("path")
      .attr("d", arc2())
      .attr("fill", "blue")
      .attr("transform", `translate(${250}, ${350})`);
  };

  render() {
    return <div className="js-arc-graph" />;
  }
}

export default ArcGraph;
