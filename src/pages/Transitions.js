import React, { Component } from "react";

import { select } from "d3-selection";
import "d3-transition";
import { easeElastic, easeBack } from "d3-ease";

import CenteredRow from "../style-components/Centered-Row";

class Transitions extends Component {
  componentDidMount() {
    this.setState(() => ({
      zoomiesAnimation: setInterval(this.animateZoomies, 4000),
      globAnimation: setInterval(this.animateGlob, 4000)
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.zoomiesAnimation);
    clearInterval(this.state.globAnimation);
  }

  animateZoomies = () => {
    select(this.refs.box1)
      .transition()
      .duration(2000)
      .style("left", "400px")
      .style("background-color", "blue")
      .transition()
      .duration(2000)
      .style("left", "0px")
      .style("background-color", "red");
    select(this.refs.box2)
      .transition()
      .duration(2000)
      .ease(easeElastic)
      .style("left", "400px")
      .style("background-color", "green")
      .transition()
      .duration(2000)
      .ease(easeElastic)
      .style("left", "0px")
      .style("background-color", "red");
    select(this.refs.box3)
      .transition()
      .duration(2000)
      .ease(easeBack)
      .style("left", "400px")
      .style("background-color", "purple")
      .transition()
      .duration(2000)
      .ease(easeBack)
      .style("left", "0px")
      .style("background-color", "red");
  };

  animateGlob = () => {
    select(this.refs.jsGlob)
      .transition()
      .duration(2000)
      .style("border-radius", "50%")
      .style("background-color", "blue")
      .transition()
      .duration(2000)
      .style("border-radius", "0%")
      .style("background-color", "red")
      .on("start", function() {
        console.log("Started");
      })
      .on("end", function() {
        console.log("Finished");
      });
  };

  render() {
    return (
      <CenteredRow>
        <h1>Wait for it...</h1>
        <div ref="box1" className="red box transition-element" />
        <div
          ref="box2"
          className="red box transition-element"
          style={{ top: "180px" }}
        />
        <div
          ref="box3"
          className="red box transition-element"
          style={{ top: "290px" }}
        />
        <div
          ref="jsGlob"
          className="red box transition-element"
          style={{ top: "400px" }}
        />
      </CenteredRow>
    );
  }
}

export default Transitions;
