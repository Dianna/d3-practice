import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";

import CenteredRow from "../style-components/Centered-Row";
import BouncingBall from "../components/BouncingBall";
import RainbowSnake from "../components/RainbowSnake";

class Animations extends Component {
  bouncingBallSVGHeight = 550;
  rainbowSnakeSVGSide = 600;

  constructor() {
    super();

    this.state = {
      active: "rainbowSnake"
    };
  }

  chooseActive = active => {
    this.setState(() => ({
      active
    }));
  };

  render() {
    const { active } = this.state;

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

          <h4>Choose an animation:</h4>
          <ButtonToolbar>
            <Button
              onClick={() => {
                this.chooseActive("rainbowSnake");
              }}
            >
              Rainbow Snake
            </Button>
            <Button
              onClick={() => {
                this.chooseActive("bouncingBall");
              }}
            >
              Bouncing Ball
            </Button>
          </ButtonToolbar>

          {active === "rainbowSnake" ? (
            <div>
              <h2>Rainbow Snake</h2>
              <h4>Trace your cursor across the grid</h4>
              <svg
                width={this.rainbowSnakeSVGSide}
                height={this.rainbowSnakeSVGSide}
              >
                <RainbowSnake sideLength={this.rainbowSnakeSVGSide} />
              </svg>
            </div>
          ) : (
            <div>
              <h2>Bouncing Ball</h2>
              <h4>Wee!</h4>
              <svg width="100%" height={this.bouncingBallSVGHeight}>
                <BouncingBall
                  x={50}
                  y={this.bouncingBallSVGHeight}
                  svgHeight={this.bouncingBallSVGHeight}
                />
              </svg>
            </div>
          )}
        </CenteredRow>
      </Grid>
    );
  }
}

export default Animations;
