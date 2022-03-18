import React, {useState} from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from '../../api';


function EducationEditForm({ setEdit, setEducations, education }) {
    //학교 이름, 전공, 졸업 정보 상태 세팅 
      const [title, setTitle] = useState(education.title);
      const [description, setDescription] = useState(education.description);
      const [graduated, setGraduated] = useState(education.graduated);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = education.user_id;
        // "educations/education id" end-point로 PUT 요청
        await Api.put(`educations/${education.id}`, {
          user_id,
          title,
          description,
          graduated,
        });
        // "educationlist/유저id" end-point로 GET 요청
        const res = await Api.get("educationlist", user_id);
        // educations를 response -> data로 세팅
        setEducations(res.data);
        // Edit 모드 종료, Edit모드를 false로
        setEdit(false);
      };


      return (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="학교 이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="전공"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Check className="mt-3"
          inline
          label="재학중"
          name="position"
          type={"radio"}
          onChange={(e) => setGraduated(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          name="position"
          type={"radio"}
          onChange={(e) => setGraduated(e.target.value)}
        />
        <Form.Check
          inline
          label="석사졸업"
          name="position"
          type={"radio"}
          onChange={(e) => setGraduated(e.target.value)}
        />
        <Form.Check
          inline
          label="박사졸업"
          name="position"
          type={"radio"}
          onChange={(e) => setGraduated(e.target.value)}
        />

        <Form.Group className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setEdit(false)}> {/*취소를 누르면 Edit모드 종료*/}
            취소
          </Button>
        </Col>
        </Form.Group>
        </Form>
    )
}

export default EducationEditForm;