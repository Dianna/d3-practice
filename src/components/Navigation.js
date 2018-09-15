import React from "react";

import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  const linkToEventKey = {
    shapes: "1",
    transitions: "2",
    axes: "3",
    "basic-svg": "4"
  };
  const currentLocation = window.location.hash.slice(2);
  let activeTab = linkToEventKey[currentLocation];

  function handleSelect(k) {
    activeTab = k;
  }

  return (
    <Nav bsStyle="tabs" activeKey={activeTab} onSelect={k => handleSelect(k)}>
      <LinkContainer to="shapes" eventKey="1">
        <NavItem>Shapes</NavItem>
      </LinkContainer>
      <LinkContainer to="transitions" eventKey="2">
        <NavItem>Transitions</NavItem>
      </LinkContainer>
      <LinkContainer to="axes" eventKey="3">
        <NavItem>Axes</NavItem>
      </LinkContainer>
      <LinkContainer to="basic-svg" eventKey="4">
        <NavItem>Basic SVG</NavItem>
      </LinkContainer>
    </Nav>
  );
}

export default Navigation;
