import React from "react";
import PropTypes from "prop-types";
import { range } from "d3-array";
import { scalePoint } from "d3-scale";

import Dot from "./Dot";

RainbowSnake.propTypes = {
  sideLength: PropTypes.number.isRequired
};

// Creates an N*N grid of Dots
function RainbowSnake(props) {
  const sideLength = props.sideLength,
    N = 50,
    /* discreted, ordinal, numeric output (N), bandwidth fixed to 0, for assigning Dot position within svg width * height */
    position = scalePoint()
      .domain(range(N)) // input
      // output: 0 to svg side length
      .range([0, sideLength])
      .padding(5)
      .round(true);

  return (
    <g>
      {range(N).map(x =>
        range(N).map(y => (
          <Dot
            x={position(x)}
            y={position(y)}
            key={`${x}-${y}`}
            maxPosition={sideLength}
          />
        ))
      )}
    </g>
  );
}

export default RainbowSnake;
