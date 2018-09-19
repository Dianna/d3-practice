import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import CenteredRow from "../style-components/Centered-Row";
import Line from "../components/Line";
import Arcs from "../components/Arcs";

class Shapes extends Component {
  render() {
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
          <Line />
          <Arcs />
        </CenteredRow>
      </Grid>
    );
  }
}

export default Shapes;
