// Code from: https://github.com/freddyrangel/playing-with-react-and-d3#how-use-react-and-d3
import React from "react";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

class AxisBottom extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node = this.refs.axis;
    var axis = axisBottom()
      .ticks(5)
      .scale(this.props.scale);

    select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate} />;
  }
}

class AxisLeft extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node = this.refs.axis;
    var axis = axisLeft()
      .ticks(5)
      .scale(this.props.scale);

    select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate} />;
  }
}

export { AxisBottom, AxisLeft };
