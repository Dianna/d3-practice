import React, { Component } from "react";
import { schemePaired } from "d3-scale-chromatic";
import { scaleBand } from "d3-scale";
import { range } from "d3-array";

// Component that draws a single color swatch
const Swatch = ({ color, width, x, y }) => (
  <rect width={width} height="20" x={x} y={y} style={{ fill: color }} />
);

// Draws an entire color scale
class ColorSwatch extends Component {
  colors = schemePaired;
  width = scaleBand().domain(range(12));

  // Before React inserts c. into DOM
  componentWillMount() {
    this.updateD3(this.props);
  }

  // Before React updates the c.
  // (prop change or state update)
  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.width.range([0, props.width]);
  }

  render() {
    return (
      <g>
        {range(12).map(i => {
          const index = this.props.reverse ? 11 - i : i;
          const color = this.colors[index];

          return (
            <Swatch
              color={color}
              width={this.width.step()}
              x={this.width(i)}
              y="0"
              key={`${this.colors[index]}-${index}`}
            />
          );
        })}
      </g>
    );
  }
}

export default ColorSwatch;
