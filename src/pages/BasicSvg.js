import React from "react";

import { select, selectAll } from "d3-selection";
import { min, max, extent, sum, mean, ticks, tickStep } from "d3-array";
import { keys, values, entries, nest } from "d3-collection";
import { csvParse, tsvParse, csvFormat, tsvFormat, dsvFormat } from "d3-dsv";

import { Grid, ButtonToolbar, Button } from "react-bootstrap";
import CenteredRow from "../style-components/Centered-Row";

function BasicSvg() {
  function parseThings() {
    const csvParsed = csvParse("name,age\nJohn,28");
    console.log("csvParsed", csvParsed);
    console.log(csvFormat([{ name: "John", age: 28 }]));

    const tsvParsed = tsvParse("name\tage\nJohn\t28");
    console.log("tsvParsed", tsvParsed);
    console.log(tsvFormat([{ name: "John", age: 28 }]));

    const psv = dsvFormat("|");
    console.log(psv.parse("name|age\nJohn|28"));
  }

  function objFunTimes() {
    const person = { name: "Arf", age: 23 };
    console.log("keys", keys(person));
    console.log("values", values(person));
    console.log("entries", entries(person));

    const tweets = [
      { user: "John", topic: "technology", numberOfTweets: 10 },
      { user: "John", topic: "politics", numberOfTweets: 30 },
      { user: "Jack", topic: "technology", numberOfTweets: 20 },
      { user: "John", topic: "entertainment", numberOfTweets: 5 },
      { user: "Jack", topic: "politics", numberOfTweets: 10 }
    ];

    const nestedTweets = nest()
      .key(function(d) {
        return d.user;
      })
      .entries(tweets);

    console.log(nestedTweets);
  }

  function arrayFunTimes() {
    const arr = [234, 54325, 4, 7, 34, 666];
    console.log("min", min(arr));
    console.log("max", max(arr));
    console.log("extent", extent(arr));
    console.log("sum", sum(arr));
    console.log("mean", mean(arr));

    console.log("ticks", ticks(0, 10, 5));
    console.log("tickStep", tickStep(0, 10, 5));

    console.log(
      max([{ name: "john", age: 22 }, { name: "hemi", age: 34 }], function(
        d,
        i
      ) {
        return d.age;
      })
    );
  }

  function doSvgThings() {
    // const svgRef = select("svg");
    //   .attr("width", 500)
    //   .attr("height", 100);

    // console.log(svgRef.attr("width"));

    selectAll("circle")
      .attr("fill", "green")
      .attr("stroke", "red");

    selectAll("line").remove();
  }

  function getCircleData() {
    const circles = select("svg")
      .selectAll("circle")
      .data([30, 40])
      .nodes();

    for (let i = 0; i < circles.length; i++) {
      const node = circles[i];
      console.log(node.__data__);
    }
  }

  function enterExitCircles() {
    const circles = select("svg").selectAll("circle");
    // const data = [10, 20, 30, 40, 50];
    // console.log("update", circles.data(data));
    // console.log("enter", circles.data(data).enter());
    // console.log("exit", circles.data(data).exit());
    // circles
    //   .data(data)
    //   .enter()
    //   .append("circle");

    // circles
    //   .data(data)
    //   .exit()
    //   .remove();

    circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("fill", "green");
  }

  return (
    <Grid>
      <CenteredRow>
        <svg width="500" height="100" style={{ border: "1px solid" }}>
          <circle cx="100" cy="70" r="10" fill="red" />
          <circle cx="200" cy="70" r="20" fill="blue" />
        </svg>
      </CenteredRow>

      <CenteredRow>
        <ButtonToolbar>
          <Button onClick={doSvgThings}>Do svg things!</Button>
          <Button onClick={getCircleData}>Get Circle Data</Button>
          <Button onClick={enterExitCircles}>Enter/Exit</Button>
          <Button onClick={arrayFunTimes}>Array Stuff</Button>
          <Button onClick={objFunTimes}>Object Stuff</Button>
          <Button onClick={parseThings}>Parse Stuff</Button>
        </ButtonToolbar>
      </CenteredRow>

      <CenteredRow>
        <svg width="500" height="400" style={{ border: "1px solid" }}>
          <circle
            cx="40"
            cy="100"
            r="30"
            fill="red"
            stroke="green"
            strokeWidth="5"
          />

          <rect x="100" y="70" width="100" height="60" fill="blue" />
          <ellipse cx="150" cy="210" rx="100" ry="25" fill="orange" />
          <line x1="240" y1="10" x2="240" y2="150" stroke="red" />

          <text x="20" y="280" fontFamily="serif" fontSize="25">
            Hello World
          </text>
        </svg>
      </CenteredRow>
    </Grid>
  );
}

export default BasicSvg;
