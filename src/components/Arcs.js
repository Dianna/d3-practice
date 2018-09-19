import React, { Component } from "react";
import ArcGraph from "../graph-components/Arc";

class Line extends Component {
  render() {
    return (
      <div>
        <h2>Arcs</h2>
        <ArcGraph width={500} height={500} />
        <h3>Explanation:</h3>
        <ul>
          <li>
            innerRadius(r) : If r > 0, it will create an annulus (donut) arc
            with the inner radius of the arc as r.
          </li>
          <li>outerRadius(r) : This sets the outer radius of the arc.</li>
          <li>
            startAngle(angle) : Sets the start angle of the arc. The angle is in
            radians with 0 at –y (12 o’clock) and positive angles proceeding
            clockwise.
          </li>
          <li>
            endAngle(angle) : Sets the start angle of the arc. The angle is in
            radians with 0 at –y (12 o’clock) and positive angles proceeding
            clockwise.
          </li>
        </ul>
      </div>
    );
  }
}

export default Line;
