/*
  학력 컨트롤러, 클라이언트의 요청에 맞게 서비스로 해당 요청 전달 후 결과를 다시 응답하는 컨트롤러
  
  2022/03/17
  김보현

 * <education 비공개 설정 구현>
 * 작성자 : 장정민, 일자 : 2022-03-23
 * - educationRouter.post('/education/create') : req.body에서 isPrivate 필드도 받아와서 리턴
 * - educationRouter.put('/educations/:id') : isPrivate 필드도 업데이트 가능하도록 수정
 * - educationRouter.get('/educationlist/:user_id') : 파라미터에 currentUserId를 추가해서 1)본인 페이지 접근 2)다른 유저의 페이지 접근 시 db에서 반환하는 데이터를 구분한다.
 * 
 *
 */

import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService} from "../services/educationService"

const educationRouter = Router();
educationRouter.use(login_required);

// 학력 정보 create post 요청
educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const {user_id, school, major, position, isPrivate} = req.body;

    const newEducation = await EducationService.addEducation({
      user_id,
      school,
      major,
      position,
      isPrivate
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

//학력 정보 유니크 id로 학력정보 찾기 
educationRouter.get("/educations/:id", async function(req, res, next){
  try{
    const educationId = req.params.id
    const education = await EducationService.getEducation({educationId})

    if(education.errorMessage){
      throw new Error(education.errorMessage)
    }

    res.status(200).send(education)
  }catch(error){
    next(error);
  };
});

// 특정 user_id를 이용해 학력 정보들을 찾기 위한 get요청
educationRouter.get("/educationlist/:user_id", async function (req, res, next) {
  try {
    //req에서 currentUserId 가져오기, login_required 파일 참고
    const currentUserId =req.currentUserId;
    const {user_id} = req.params;
    const educationList = await EducationService.getEducationList({ currentUserId, user_id });
    res.status(200).send(educationList);
  } catch (error) {
    next(error);
  }
})

// 학력 정보 id를 통해 put요청 (update)
educationRouter.put('/educations/:id', async function (req, res, next){
  try {
    const educationId = req.params.id;
    
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const position = req.body.position ?? null;
    const isPrivate = req.body.isPrivate ?? null;

    const toUpdate = { 
      school,
      major,
      position,
      isPrivate
    };
    
    const education = await EducationService.setEducation({ educationId, toUpdate });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

// 해당 award 아이디에 맞는 award를 삭제하고 성공 메시지 반환
educationRouter.delete('/educations/:id', async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await EducationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});



export {educationRouter}

