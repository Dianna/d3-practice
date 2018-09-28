import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { axisBottom } from "d3-axis";
import D3blackbox from "./D3Blackbox";

const BottomAxis = D3blackbox(function() {
  const scale = scaleLinear()
    .domain([0, 10])
    .range([0, 200]);
  const axis = axisBottom(scale);

  select(this.refs.anchor).call(axis);
});

export { BottomAxis };
