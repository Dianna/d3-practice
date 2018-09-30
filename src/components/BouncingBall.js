import React, { Component } from "react";
import PropTypes from "prop-types";

import { timer as d3Timer, now as d3Now } from "d3-timer";

export default class BouncingBall extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    svgHeight: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      y: 5, // start height
      vy: 0 // start velocity y direction
    };
  }

  // Start gameLoop
  componentDidMount() {
    this.timer = d3Timer(() => this.gameLoop());
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  // gameLoop allows fine grained control of animation
  gameLoop() {
    let { y, vy, lastFrame } = this.state;

    if (y + vy > this.props.svgHeight) {
      vy = -vy * 0.87;
    }

    let frames = 1;

    // tracking frame avoids jumps caused by throttling issues
    if (lastFrame) {
      //  60 fps (16 ms)
      frames = (d3Now() - lastFrame) / (1000 / 60);
    }

    this.setState({
      y: y + vy * frames,
      vy: vy + 0.3 * frames,
      lastFrame: d3Now()
    });
  }

  render() {
    return <circle cx={this.props.x} cy={this.state.y} r="5" />;
  }
}
