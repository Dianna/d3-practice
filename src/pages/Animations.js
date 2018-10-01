import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";

import CenteredRow from "../style-components/Centered-Row";
import BouncingBall from "../components/BouncingBall";
import RainbowSnake from "../components/RainbowSnake";
import Alphabet from "../components/Alphabet";

class Animations extends Component {
  bouncingBallSVGHeight = 550;
  rainbowSnakeSVGSide = 600;

  constructor() {
    super();

    this.state = {
      active: "alphabet"
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
                this.chooseActive("alphabet");
              }}
            >
              Alphabet
            </Button>
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

          {active === "alphabet" && (
            <div>
              <h2>Alphabet</h2>
              <svg width="800" height="600">
                <Alphabet x="32" y="100" />
              </svg>
            </div>
          )}

          {active === "rainbowSnake" && (
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
          )}

          {active === "bouncingBall" && (
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
