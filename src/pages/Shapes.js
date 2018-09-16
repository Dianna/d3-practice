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
          <h1>Graphs!</h1>
          <h4>
            Credit:{" "}
            <a href="http://rajapradhan.com/blogs/d3-js-v4-essentials/shapes/">
              Raja Pradhan
            </a>{" "}
            who's code and explanations I modified here
          </h4>
          <h2>Line Graph</h2>
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
          <h3>Explanation:</h3>
          <ul>
            <li>
              We have 2 data arrays containing the (x,y) points which when
              joined will create the full line.
            </li>
            <li>
              We use d3.line() function which returns a line generator and we
              specified that the x coordinate will be calculated using the
              xScale mapping and y coordinate will be calculated using the
              yScale mapping.
            </li>
            <li>
              We create a path element in the svg container and set the value of
              the d attribute using the newly created line generator function y
              passing the complete data set to the generator.
            </li>
            <li>
              Using an area generator is similar to using a line generator. The
              only difference is we specify the lower(x0,y0) and upper(x1,y1)
              bounds on both x and y axes in the area generator
            </li>
          </ul>
        </CenteredRow>
      </Grid>
    );
  }
}

export default Shapes;
