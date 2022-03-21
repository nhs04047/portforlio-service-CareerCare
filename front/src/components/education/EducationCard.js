import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function EducationCard({ isEditable, setEdit, education }) {
    return <Card.Text>
    <Row className="align-items-center">
      <Col>
        <span>{education.school}</span>
        <br />
        <span className="text-muted">{`${education.major} (${education.position})`}</span>   {/*전공, 체크 된 졸업 정보 UI*/}
      </Col>
      {isEditable && 
      <Col xs lg="1">
        <Button 
          variant="outline-info" 
          size="sm" 
          className="mr-3" 
          onClick={() => setEdit((cur) => !cur)} >
          편집
        </Button>
      </Col>
      }
    </Row>
  </Card.Text>
}

export default EducationCard;