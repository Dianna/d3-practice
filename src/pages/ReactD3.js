import React, { Component } from "react";

import { Grid } from "react-bootstrap";
import { BottomAxis } from "../graph-components/SimpleAxis";
import ColorSwatch from "../graph-components/ColorSwatch";

const svgStyle = {
  width: "500",
  height: "50",
  padding: "5",
  id: "svg",
  border: "1px solid black"
};

class ReactD3 extends Component {
  render() {
    return (
      <Grid>
        <h1>React + D3 = Not Scary</h1>
        <h2>
          Following{" "}
          <a href="https://github.com/Swizec/react-d3js-step-by-step">
            Swizec's guide
          </a>
        </h2>

        <h3>Simple Wrapped Axis</h3>
        <svg style={svgStyle}>
          <BottomAxis x={20} y={20} />
        </svg>

        <h3>Color Swatch</h3>
        <svg style={svgStyle}>
          <ColorSwatch width="490" />
        </svg>
        <svg style={svgStyle}>
          <ColorSwatch width="490" reverse={true} />
        </svg>
      </Grid>
    );
  }
}

export default ReactD3;
