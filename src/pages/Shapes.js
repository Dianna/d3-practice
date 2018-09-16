import React, { Component } from "react";
import LineGraph from "../graph-components/Line";
import { Grid } from "react-bootstrap";
import CenteredRow from "../style-components/Centered-Row";
import { ButtonToolbar, Button } from "react-bootstrap";

import { line1, line2 } from "../data";

const dataSets = [
  { data: line1, color: "red" },
  { data: line2, color: "blue" }
];

class Shapes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLineCardinal: false,
      isAreaShown: false
    };
  }

  interpolateLine = () => {
    this.setState(prevState => ({
      isLineCardinal: !prevState.isLineCardinal
    }));
  };

  interpolateArea = () => {
    this.setState(prevState => ({
      isAreaShown: !prevState.isAreaShown
    }));
  };

  render() {
    const { isLineCardinal, isAreaShown } = this.state;

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
            isLineCardinal={isLineCardinal}
            isAreaShown={isAreaShown}
          />
          <ButtonToolbar>
            <Button onClick={this.interpolateLine}>
              {isLineCardinal ? "Cardinal" : "Line"}
            </Button>
            <Button onClick={this.interpolateArea}>
              {isAreaShown ? "Hide Area" : "Show Area"}
            </Button>
          </ButtonToolbar>
        </CenteredRow>
      </Grid>
    );
  }
}

export default Shapes;
