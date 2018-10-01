// creates random lists of letters every 1.5 seconds, then maps through them to render Letter components
import React, { Component } from "react";
import PropTypes from "prop-types";
// Gives us React lifecycle hooks akin to D3's .enter(), .exit(), and .update()
import { TransitionGroup } from "react-transition-group";
import { shuffle } from "d3-array";
import { interval } from "d3-timer";

import Letter from "./Letter";

export default class Alphabet extends Component {
  static propTypes = {
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired
  };

  static letters = "abcdefghijklmnopqrstuvwxyz".split("");

  state = {
    alphabet: []
  };

  // Shuffle alphabet
  componentWillMount() {
    const shuffleInterval = interval(() => {
      const shuffledAlphabet = shuffle(Alphabet.letters)
        .slice(0, Math.floor(Math.random() * Alphabet.letters.length))
        .sort();

      this.setState(() => ({
        alphabet: shuffledAlphabet
      }));
    }, 1500);

    this.setState(() => ({ shuffleInterval }));
  }

  componentWillUnmount() {
    this.state.shuffleInterval.stop();
  }

  componentDidUpdate() {
    console.log("--------------------------");
  }

  // create svg
  render() {
    let transform = `translate(${this.props.x}, ${this.props.y})`;

    return (
      <g transform={transform}>
        {/* TODO: TRANSITIONGROUP LIFECYCLE METHODS NOT AVAILABLE IN LETTER */}
        <TransitionGroup component="g">
          {this.state.alphabet.map((l, i) => {
            console.log("i", i, " : letter = ", l);
            return <Letter letter={l} i={i} key={`letter-${l}`} />;
          })}
        </TransitionGroup>
      </g>
    );
  }
}
