import React, { Component } from "react";
import LineGraph from "../graph-components/Line";
import { Grid } from "react-bootstrap";
import CenteredRow from "../style-components/Centered-Row";

import { line1, line2 } from "../data";

const dataSets = [
  { data: line1, color: "red" },
  { data: line2, color: "blue" }
];

class Shapes extends Component {
  render() {
    return (
      <Grid>
        <CenteredRow>
          <LineGraph
            dataSets={dataSets}
            width={500}
            height={500}
            margin={25}
            xDomain={[0, 10]}
            yDomain={[10, 0]}
          />
        </CenteredRow>
      </Grid>
    );
  }
}

export default Shapes;
