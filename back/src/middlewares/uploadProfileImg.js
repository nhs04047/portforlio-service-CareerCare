/*
이미지 파일의 저장 경로와 이름을 설정하기 위한 미들웨어

2022.03.24
김보현
*/
import multer from "multer"
import path from "path"

const upload = multer({
  storage: multer.diskStorage({  // 이미지 저장 정보 설정
    destination(req, file, done) { 
      done(null, 'src/uploads/profile_img'); 
    },
    filename(req, file, done) {   // 이미지 이름 설정
      const ext = path.extname(file.originalname); 
      const user_id = req.params.id
      done(null, user_id + "_" + Date.now() + ext); // userId + 날짜 + 확장자 이름으로 저장
    }
  }),
});

export { upload }