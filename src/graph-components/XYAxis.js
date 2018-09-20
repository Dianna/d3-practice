// Code from: https://github.com/freddyrangel/playing-with-react-and-d3#how-use-react-and-d3
import React from "react";
import { AxisBottom, AxisLeft } from "./Axes";

export default props => {
  const xSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: "bottom"
  };
  const ySettings = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: "left"
  };

  return (
    <g className="xy-axis">
      <AxisBottom {...xSettings} />
      <AxisLeft {...ySettings} />
    </g>
  );
};
