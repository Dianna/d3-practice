import React from "react";

import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  const destinations = [
    {
      routeName: "animations",
      tabName: "Animations"
    },
    {
      routeName: "react-d3",
      tabName: "React D3"
    },
    {
      routeName: "shapes",
      tabName: "Shapes"
    },
    {
      routeName: "transitions",
      tabName: "Transitions"
    },
    {
      routeName: "axes",
      tabName: "Axes"
    },
    {
      routeName: "basic-svg",
      tabName: "Basic SVG"
    }
  ];

  const linkToEventKey = destinations.reduce((accumulator, currentVal, i) => {
    let key = currentVal.routeName;
    accumulator[`${key}`] = i + 1;
    return accumulator;
  }, {});

  const currentLocation = window.location.hash.slice(2);
  let activeTab = linkToEventKey[currentLocation];

  function handleSelect(k) {
    activeTab = k;
  }

  return (
    <Nav bsStyle="tabs" activeKey={activeTab} onSelect={k => handleSelect(k)}>
      {destinations.map((val, i) => (
        <LinkContainer to={val.routeName} eventKey={i + 1} key={i + 1}>
          <NavItem>{val.tabName}</NavItem>
        </LinkContainer>
      ))}
    </Nav>
  );
}

export default Navigation;
