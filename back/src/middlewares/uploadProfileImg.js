/*
* <이미지 처리 미들웨어 작성>
* 작성자 : 김보현
* 작성일 : 2022.03.24
* 이미지 파일의 저장 경로와 이름을 설정하기 위한 미들웨어
*/

import multer from "multer"
import path from "path"

const upload = multer({
  // 이미지 저장 정보 설정
  storage: multer.diskStorage({  
    destination(req, file, done) { 
      done(null, 'uploads/profile_img'); 
    },
    // 이미지 이름 설정
    filename(req, file, done) {   
      const ext = path.extname(file.originalname); 
      const user_id = req.params.id
      done(null, user_id + "_" + Date.now() + ext); // userId + 날짜 + 확장자 이름으로 저장
    }
  }),
});

export { upload }