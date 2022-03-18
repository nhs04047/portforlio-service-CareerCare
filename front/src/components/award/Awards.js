import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

// 수상이력 UI 그려주는 컴포넌트 - 작성자: 이영우
// 기능 - Award 컴포넌트의 UI를 그려주고, 조건을 관리합니다.
// 완성여부 - 백엔드와 통신 테스트 전입니다. (아래와 같이 기본 값을 주면 UI가 표시됩니다.)

function Awards({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성해야함
  const [awards, setAwards] = useState([{title : "이상한 말투 상", description: "괜찬잖아버리기~"}]);
  //useState로 addAward 상태를 생성해야함
  const [addAward, setAddAward] = useState(false);
  useEffect(() => {
    // "awardlist/id" GET 요청, response의 data -> awards를 세팅
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.id}
            award={award}
            setAwards={setAwards}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setAddAward(true)}>+</Button>
            </Col>
          </Row>
        )}
        {addAward && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setAddAward={setAddAward}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
