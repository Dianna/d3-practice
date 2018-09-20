// Code from: https://github.com/freddyrangel/playing-with-react-and-d3#how-use-react-and-d3
import React from "react";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";

import XYAxis from "./XYAxis";
import DataCircles from "./DataCircles";

// Returns the largest X coordinate from the data set
const xMax = data => max(data, d => d[0]);

// Returns the higest Y coordinate from the data set
const yMax = data => max(data, d => d[1]);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = props => {
  return scaleLinear()
    .domain([0, xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = props => {
  return scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export default props => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };

  return (
    <svg
      width={props.width}
      height={props.height}
      style={{ border: props.border }}
    >
      <DataCircles {...props} {...scales} />
      <XYAxis {...props} {...scales} />
    </svg>
  );
};
