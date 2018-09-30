import React, { Component } from "react";
import PropTypes from "prop-types";
import { select } from "d3-selection";
import { easeCubicOut } from "d3-ease";
import { scaleLinear } from "d3-scale";
import { interpolateWarm } from "d3-scale-chromatic";

// Returns a black circle that animates on mouseOver
export default class Dot extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    maxPosition: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { r: 5 };
  }

  // Animates to a larger radius with a color (based on x and y positions) then animates back to the smaller radius and black
  animateDot = () => {
    let node = select(this.refs.circle);

    // give the dot a color
    this.setState({ colorize: true });

    node
      // increase radius
      .transition()
      .attr("r", 20)
      .duration(250)
      .ease(easeCubicOut)
      // reset radius
      .transition()
      .attr("r", 5)
      .duration(250)
      .ease(easeCubicOut)
      // reset dot to black
      .on("end", () => this.setState(() => ({ colorize: false })));
  };

  // Return a color from D3's interpolate warm based on Dot's x and y position
  get color() {
    const { x, y, maxPosition } = this.props;

    // t= angle subtended by the circle relative to the grid's center
    const t = scaleLinear()
      .domain([0, maxPosition ** 2]) // input
      .range([0, 1]); // output

    // interpolateWarm takes a number from [0, 1]
    // remember x**2 + y**2 = r**2, we square the positions so that when traveling in an upward diagonal the color changes (same color across arcs from (0,0))
    return interpolateWarm(t(x ** 2 + y ** 2));
  }

  render() {
    const { x, y } = this.props,
      { r, colorize } = this.state;

    return (
      <circle
        cx={x}
        cy={y}
        r={r}
        ref="circle"
        onMouseOver={this.animateDot}
        style={{ fill: colorize ? this.color : "black" }}
      />
    );
  }
}
