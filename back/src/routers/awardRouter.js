/*
 * Award MVP 컨트롤러
 *
 * <Award CRUD 구현>
 * 직성자 : 천준석
 * 작성일 : 2022.03.16
 * 클라이언트로부터 넘어온 정보들로 awardService에 넘겨주고, 해당 작업에 맞는 return을 awardService으로부터 받아서 클라이언트로 보내준다.
 *
 * <award 비공개 설정 구현>
 * 작성자 : 장정민
 * 작성일 : 2022.03.23
 * request로 isPrivate 필드를 받을 수 있도록 변경, 다른 페이지 접근 시 db에서 반환하는 데이터를 구분 할 수 있도록 함.
 *
 */

import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { AwardService } from '../services/awardService';

const awardRouter = Router();
awardRouter.use(login_required);

/*
 * 수상이력을 만드는 router api(로그인이 된 상태여야지 수상이력을 만들 수 있으니깐 login_required 미들웨어 사용)
 */
awardRouter.post('/award/create', async function (req, res, next) {
  try {
    const { user_id, title, description, isPrivate } = req.body;

    const newAward = await AwardService.addAward({
      user_id,
      title,
      description,
      isPrivate,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

/*
 *해당 award 아이디에 맞는 award 반환하는 조회 api
 */
awardRouter.get('/awards/:id', async function (req, res, next) {
  try {
    const awardId = req.params.id;
    // 해당 award 아이디에 맞는 award를 db에서 찾기
    const award = await AwardService.getAward({ awardId });

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

/*
 * 해당 award 아이디에 맞는 수정된 award 반환하는 수정 api
 */
awardRouter.put('/awards/:id', async function (req, res, next) {
  try {
    const awardId = req.params.id;

    // body data로 부터 수정하기 위한 title, description 정보 추출(수정하지 않는다면 null)
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const isPrivate = req.body.isPrivate ?? null;

    const toUpdate = { title, description, isPrivate };
    // 해당 award 아이디에 맞는 데이터를 db에 갱신, 업데이트 내용이 없을 시 생략
    const award = await AwardService.setAward({ awardId, toUpdate });

    res.status(200).send(award);
  } catch (err) {
    next(err);
  }
});

/*
 * user_id에 알맞는 사용자의 award 리스트를 보여주는 목록 조회 api
 */
awardRouter.get('/awardlist/:user_id', async function (req, res, next) {
  try {
    //req에서 currentUserId 가져오기, login_required 파일 참고
    const currentUserId = req.currentUserId;
    const user_id = req.params.user_id;

    // 해당 user_id에 맞는 award 목록 db에서 가져와 조회
    const awardList = await AwardService.getAwardList({
      currentUserId,
      user_id,
    });
    res.status(200).send(awardList);
  } catch (err) {
    next(err);
  }
});

/*
 * 해당 award 아이디에 맞는 award를 삭제하고 성공 메시지 반환
 */
awardRouter.delete('/awards/:id', async function (req, res, next) {
  try {
    const awardId = req.params.id;

    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
