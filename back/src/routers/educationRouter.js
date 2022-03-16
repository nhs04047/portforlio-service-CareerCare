/*
  학력 컨트롤러, 클라이언트의 요청에 맞게 서비스로 해당 요청 전달 후 결과를 다시 응답하는 컨트롤러
  
  2022/03/16
  김보현
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

    const {user_id} = req.body;
    const {school} = req.body;
    const {major} = req.body;
    const {degree} = req.body;

    const newEducation = await EducationService.addEducation({
      user_id,
      school,
      major,
      degree
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

// 특정 user_id를 이용해 학력 정보들을 찾기 위한 get요청
educationRouter.get("/educationlist/:user_id", async function (req, res, next) {
  try {
    const {user_id} = req.params;
    const educationList = await EducationService.getEducationList({ user_id });
    res.status(200).send(educationList);
  } catch (error) {
    next(error);
  }
})

export {educationRouter}

