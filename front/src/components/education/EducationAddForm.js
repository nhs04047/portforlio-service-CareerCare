import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from '../../api';

function EducationAddForm({ portfolioOwnerId, setEducations, setAddEducation }) {
    //학교 이름, 전공, 졸업 정보 상태 세팅 
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [position, setPosition] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = portfolioOwnerId;
        // "education/create" end-point로 post요청
        await Api.post("education/create", {
          user_id: portfolioOwnerId,
          school,
          major,
          position,
        });
        // "educationlist/유저id" end-point로 get요청
        const res = await Api.get("educationlist", user_id);
        // educations를 response -> data로 세팅
        setEducations(res.data);
        // Add 모드가 끝남, addEducation을 false로 세팅
        setAddEducation(false);
      };

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="학교 이름"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>

        <Form.Check className="mt-3"
          inline
          label="재학중"
          name="position"
          type={"radio"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          name="position"
          type={"radio"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="석사졸업"
          name="position"
          type={"radio"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
          name="position"
          type={"radio"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Group className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setAddEducation(false)}> {/*취소를 누르면 add모드 종료*/}
            취소
          </Button>
        </Col>
        </Form.Group>
        </Form>
    )


}

export default EducationAddForm;