import React, { Component } from "react";
import { Grid } from "react-bootstrap";

import CenteredRow from "../style-components/Centered-Row";
import BouncingBall from "../components/BouncingBall";

class Animations extends Component {
  bouncingBallSVGHeight = 550;

  render() {
    return (
      <Grid>
        <CenteredRow>
          <h1>Animations</h1>
          <h4>
            Credit:{" "}
            <a href="https://github.com/Swizec/react-d3js-es6-ebook">
              Swizec Teller
            </a>{" "}
            who's code and explanations I modified here
          </h4>
          <h2>Bouncing Ball</h2>
          <svg width="100%" height={this.bouncingBallSVGHeight}>
            <BouncingBall
              x={50}
              y={this.bouncingBallSVGHeight}
              svgHeight={this.bouncingBallSVGHeight}
            />
          </svg>
        </CenteredRow>
      </Grid>
    );
  }
}

export default Animations;
