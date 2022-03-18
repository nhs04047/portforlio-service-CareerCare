import React, {useState} from "react";
import { Button, Form, Col} from "react-bootstrap";
import * as Api from '../../api';

// 수상이력 수정 컴포넌트 - 작성자: 이영우
// 기능 - user id를 api에 요청, 입력값을 바탕으로 award 카드를 수정합니다. 
// 완성여부 - placeholder이 현재 값으로 뜨지 않는 것 제외, 완성했습니다.

function AwardEditForm({ setEdit, setAwards, curAward }) {
      //useState로 title 상태를 생성, 편집 시 현재 있는 값으로 input에 표시해야 함
      const [title, setTitle] = useState(curAward.title);
      //useState로 description 상태를 생성, 편집 시 현재 있는 값으로 input에 표시해야 함
      const [description, setDescription] = useState(curAward.description);

      const handleSubmit = async (e) => {
        e.preventDefault();
        // curAward의 user_id를 변수에 할당
        const user_id = curAward.user_id;
        // "awards/award id" end-point로 PUT 요청
        await Api.put(`awards/${curAward.id}`, {
          user_id,
          title,
          description,
        });
        // "awardlist/유저id" end-point로 GET 요청
        const res = await Api.get("awardlist", user_id);
        // awards를 response -> data로 세팅
        setAwards(res.data);
        // Edit 모드 종료, Edit모드를 false로
        setEdit(false);
      };
    //네트워크 요청 구현

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="수상내역"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

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

export default AwardEditForm;