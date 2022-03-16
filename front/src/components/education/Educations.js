import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function Educations() {
    
  return (
    <Card>
        <Card.Body>
            <Card.Title>학력</Card.Title>
            <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button>+</Button>
            </Col>
          </Row>
        </Card.Body>
    </Card>
  )


}

export default Educations;