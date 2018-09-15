import React, { Component } from "react";

import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

import { Grid } from "react-bootstrap";
import CenteredRow from "../style-components/Centered-Row";

// Must be a component so the svgContainer can affix to the product of the render function
class GraphAxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 500,
      width: 500,
      margin: 25
    };
    this.state.axisLength = this.state.width - 2 * this.state.margin; // Prevent crowding on border
  }

  componentDidMount() {
    this.renderGraph();
  }

  renderGraph = () => {
    const svgContainer = select("#js-grid-space")
      .append("svg")
      .attr("width", this.state.width)
      .attr("height", this.state.height)
      .style("border", "1px solid");

    this.renderXAxis(svgContainer);
    this.renderYAxis(svgContainer);
  };

  renderXAxis = svgContainer => {
    const { axisLength, margin, height } = this.state;

    const xScale = scaleLinear()
      .domain([0, 100]) // Max value of incoming data
      .range([0, axisLength]); // Max value of svg container

    const xAxis = axisBottom(xScale);
    svgContainer
      .append("g")
      // Give class to x-axis for targetting
      .classed("x-axis", true)
      // Fix x-axis to bottom of graph
      .attr("transform", function() {
        return `translate(${margin}, ${height - margin})`;
      })
      .call(xAxis);

    // Create vertical lines of grid
    svgContainer
      .selectAll("g.x-axis g.tick") // target axis ticks
      .append("line")
      .classed("grid-line", true)
      .style("stroke", "#ccc")
      // (x1, y1): starting point of line
      // (x2, y2): ending point of line
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -(height - 2 * margin));
  };

  renderYAxis = svgContainer => {
    const { axisLength, margin } = this.state;

    const yScale = scaleLinear()
      .domain([100, 0])
      .range([0, axisLength]);

    const yAxis = axisLeft(yScale);

    svgContainer
      .append("g")
      .classed("y-axis", true)
      .attr("transform", function() {
        return `translate(${margin}, ${margin})`;
      })
      .call(yAxis);

    svgContainer
      .selectAll("g.y-axis g.tick")
      .append("line")
      .classed("grid-line", true)
      .style("stroke", "#ccc")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", axisLength)
      .attr("y2", 0);
  };

  render() {
    return (
      <Grid>
        <CenteredRow id="js-grid-space" />
      </Grid>
    );
  }
}

export default GraphAxes;
