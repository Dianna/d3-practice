import React from "react";
import { Row, Col } from "react-bootstrap";

function CenteredRow(props) {
  return (
    <Row {...props}>
      <Col xs={0} sm={1} />
      <Col xs={12} sm={10}>
        {props.children}
      </Col>
      <Col xs={0} sm={1} />
    </Row>
  );
}

export default CenteredRow;
