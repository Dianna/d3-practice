// renders an SVG text element and takes care of its own enter/update/exit transitions
import React, { Component } from "react";
import PropTypes from "prop-types";
import { transition } from "d3-transition";
import { easeCubicInOut } from "d3-ease";
import { select } from "d3-selection";

const ExitColor = "brown",
  UpdateColor = "#333",
  EnterColor = "green";

// Update pattern: Update state, do transition, sync state with reality after transition
export default class Letter extends Component {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired
  };
  // TODO: All our magic values – default/final y coordinate, transition properties, etc. – are good candidates for props. That would make Alphabet more flexible

  state = {
    y: -60,
    x: 0,
    color: EnterColor,
    fillOpacity: 1e-6
  };

  transition = transition()
    .duration(750)
    .ease(easeCubicInOut);

  // TODO: DOESN'T FIRE
  // from RTG
  componentWillEnter(callback) {
    console.log("enter");
    // start enter transition, then callback()
    let node = select(this.refs.letter); // Hand letter to D3

    // Set width
    this.setState(() => ({ x: this.props.i * 32 })); // TODO: how do we know this width?

    // Move up and become visible
    node
      .transition(this.transition)
      .attr("y", 0)
      .style("fill-opacity", 1)
      // Hand letter back to React
      .on("end", () => {
        console.log("end");
        this.setState(() => ({
          y: 0,
          fillOpacity: 1,
          color: UpdateColor
        }));
        callback();
      });
  }

  // TODO: DOESN'T FIRE
  // from RTG
  componentWillLeave(callback) {
    console.log("leave");
    // start exit transition, then callback()
    let node = select(this.refs.letter);

    this.setState(() => ({ color: ExitColor }));

    // Move down and become invisible
    node
      .transition(this.transition)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .on("end", () => {
        this.setState(() => ({
          y: 60,
          fillOpacity: 1e-6
        }));
        callback();
      });
  }

  // TODO: DOESN'T FIRE
  // componentWillAppear(callback) {
  //   console.log("componentWillAppear");
  //   callback();
  // }
  // componentDidAppear(callback) {
  //   console.log("componentDidAppear");
  //   callback();
  // }
  // componentDidEnter(callback) {
  //   console.log("componentDidEnter");
  //   callback();
  // }
  // componentDidLeave(callback) {
  //   console.log("componentDidLeave");
  //   callback();
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.i !== nextProps.i) {
      console.log("update");
      // start update transition
      let node = select(this.refs.letter);

      this.setState(() => ({ color: UpdateColor }));

      node
        .transition(this.transition)
        .attr("x", nextProps.i * 32)
        .on("end", () => this.setState(() => ({ x: nextProps.i * 32 })));
    }
  }

  render() {
    const { x, y, fillOpacity, color } = this.state;

    return (
      <text
        dy=".35em"
        x={x}
        y={y}
        style={{
          fillOpacity,
          fill: color,
          font: "bold 48px monospace"
        }}
        ref="letter"
      >
        {this.props.letter}
      </text>
    );
  }
}
