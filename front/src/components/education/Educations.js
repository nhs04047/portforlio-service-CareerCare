import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function Educations({ portfolioOwnerId, isEditable }) {
  //useState로 educations, addEducation 상태 생성
  const [educations, setEducations] = useState([]);
  const [addEducation, setAddEducation] = useState(false);
  useEffect(() => {
    // "educationlist/id" GET 요청, response의 data -> educations 세팅
    Api.get("educationlist", portfolioOwnerId).then((res) => setEducations(res.data));
  }, [portfolioOwnerId]);
    
  return (
    <Card>
        <Card.Body>
            <Card.Title>학력</Card.Title>
            {educations.map((education) => (
          <Education
            key={education.id}
            education={education}
            setEducations={setEducations}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setAddEducation(true)}>+</Button>
            </Col>
          </Row>
        )}
        {addEducation && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setEducations}
            setAddEducation={setAddEducation}
          />
        )}
        </Card.Body>
    </Card>
  );
}

export default Educations;