import React, { Component } from "react";

import { select } from "d3-selection";
import "d3-transition";
import { easeElastic, easeBack } from "d3-ease";

import CenteredRow from "../style-components/Centered-Row";

class Transitions extends Component {
  componentDidMount() {
    setInterval(this.renderAnimation, 4000);
    setInterval(this.animateGlob, 4000);
  }

  renderAnimation = () => {
    select(".js-box-1")
      .transition()
      .duration(2000)
      .style("left", "400px")
      .style("background-color", "blue")
      .transition()
      .duration(2000)
      .style("left", "0px")
      .style("background-color", "red");

    select(".js-box-2")
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

    select(".js-box-3")
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
    select(".js-glob")
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
      <CenteredRow id="js-grid-space">
        <div className="red box transition-element js-box-1" />
        <div
          className="red box transition-element js-box-2"
          style={{ top: "110px" }}
        />
        <div
          className="red box transition-element js-box-3"
          style={{ top: "220px" }}
        />
        <div
          className="red box transition-element js-glob"
          style={{ top: "330px" }}
        />
      </CenteredRow>
    );
  }
}

export default Transitions;
