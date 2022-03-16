import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

// 수상이력 컴포넌트 - 작성자: 이영우
// 기능 - edit 모드를 설정하고, edit이 true일땐 수정 폼, false일땐 카드를 보여줍니다.
// 완성여부 - 백엔드와 통신 테스트 전입니다.

function Award({ isEditable, award, setAwards }) {
    const [edit, setEdit] = useState(false);
    return (
        <>
          {edit ? 
          <AwardEditForm setEdit={setEdit} curAward={award} setAwards={setAwards}/> 
          : <AwardCard isEditable={isEditable} setEdit={setEdit} award={award}/>}
        </>
    )
}

export default Award;