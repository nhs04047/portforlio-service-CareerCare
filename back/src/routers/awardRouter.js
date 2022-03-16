/*
  클라이언트로부터 넘어온 정보들로 awardService에 넘겨주고, 해당 작업에 맞는 return을 awardService으로부터 받아서 클라이언트로 보내준다.
  천준석
  2022/03/16
*/

import is from "@sindresorhus/is";
import { Router } from "express";
import { nextTick } from "process";
import { login_required } from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

// 수상이력을 만드는 router(로그인이 된 상태여야지 수상이력을 만들 수 있으니깐 login_required 미들웨어 사용)
awardRouter.post("/award/create", login_required, async function(req, res, next){
  try {
    // req에서 데이터 가져오기(user_id, title, description)
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 AwardService -> Award -> DB에 저장
    const newAward = await AwardService.addAward({user_id, title, description});

    res.status(201).json(newAward);
  } catch (error) {
    error(next);
  }
})

// 해당 아이디에 맞는 award 반환
awardRouter.get("/awards/:id", login_required, async function(req, res, next) {
  try {
    // req에서 id 가져오기
    const awardId = req.params.id;
    // 해당 아이디에 맞는 award를 db에서 찾기
    const award = await AwardService.getAward({awardId});

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
})

export {awardRouter};