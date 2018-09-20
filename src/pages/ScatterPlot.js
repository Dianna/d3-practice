// Code from: https://github.com/freddyrangel/playing-with-react-and-d3#how-use-react-and-d3

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Chart from "../graph-components/Chart";

const styles = {
  width: 500,
  height: 300,
  padding: 30,
  border: "1px solid black"
};

// The number of data points for the chart.
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, { length: numDataPoints }).map(() => [
    randomNum(),
    randomNum()
  ]);
};

export default class ScatterPlotGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { data: randomDataSet() };
  }

  randomizeData = () => {
    this.setState(() => ({ data: randomDataSet() }));
  };

  render() {
    return (
      <div>
        <h1>Scatter Plot</h1>
        <h3>
          Code and explanation adapted from{" "}
          <a href="https://github.com/freddyrangel/playing-with-react-and-d3#how-use-react-and-d3">
            freddyrangel
          </a>
        </h3>
        <Chart {...this.state} {...styles} />
        <div className="controls">
          <Button className="btn randomize" onClick={this.randomizeData}>
            Randomize Data
          </Button>
        </div>
        <h3>Explanation:</h3>
        <ul>
          <li>
            Side note about how React works: React offers great performance for
            rendering UI components by implementing a diff algorithm, comparing
            a virtual DOM in memory with the actual DOM. When you think about
            it, the DOM is really a large tree structure. If there's one thing
            we learned from decades of computer science research, it's how to
            compare and manipulate trees. React takes advantage of clever tree
            diffing algorithms, but in order for it to work, each component can
            only render one parent element (meaning that you cannot render
            sibling elements). That's why In the render function we're wrapping
            all our elements in one parent div.
          </li>
          <li>
            D3 uses SVG to render data visualizations. D3 has special methods
            for creating SVG elements and binding data to those elements.
            However, we're going to let React handle that.
          </li>
          <li>
            Let's talk about D3 scales. This is where D3 shines. Scales take
            care of doing all the messy math converting your data into a format
            that can be displayed on a chart. If you have a data point value
            189281 but your chart is only 200 pixels wide, D3 scales will
            convert that number to a number you can use to plot that point.
          </li>
          <li>
            In the DataCircles component, we're rendering a g element, which is
            like the SVG equivalent to a div. Since we want to render a point
            for every set of X-Y coordinates, we're going to render multiple
            sibling elements, so we're wrapping it all in a g element for React
            to work. Inside of g, we're mapping over the data and rendering a
            circle for each one using renderCircles. renderCircles creates an
            SVG circle element which takes a number of properties. Here's we're
            setting the x and y coordinates (cx and cy respectively) with the D3
            scales passed in from the ScatterPlot component. r is the radius of
            our circle, and key is something React requires us to do. Since
            we're rendering identical sibling components, React's diffing
            algorithm needs some kind of way to keep track of them as it updates
            the DOM over and over. You can use any key you like, as long as it's
            unique to the list. Here we're just going to use the index of each
            element.
          </li>
          <li>
            Our strategy up to this point is letting React exclusively handle
            the DOM. This is a good general rule, but we need to leave room for
            nuance. In this case, the math and work we would have to do for
            rendering an axis is really complicated, and D3 has abstracted that
            pretty nicely, so we're going to let D3 have access to the DOM in
            this case. Also, since we're only going to render a maximum of 2
            axis, the performance tradeoff is almost non-existant. We're going
            to create a g element which we will hand over to D3 to do it's DOM
            manipulation. transform is an attribute of a g, which defines a list
            of transform definitions applied to an element and an element's
            children. We're passing in a translate attribute which will move the
            g element where we want it.
          </li>
        </ul>
      </div>
    );
  }
}
