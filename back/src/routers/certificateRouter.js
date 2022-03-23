/*
  클라이언트로부터 넘어온 정보들로 certificateService에 넘겨주고, 해당 작업에 맞는 return을 certificateService에 받아서 클라이언트로 보내준다.
  천준석
  2022/03/17
 * <certificate 비공개 설정 구현>
 * 작성자 : 장정민, 일자 : 2022-03-23
 * - certificateRouter.post('/certificate/create') : req.body에서 isPrivate 필드도 받아와서 리턴
 * - certificateRouter.put('/certificates/:id') : isPrivate 필드도 업데이트 가능하도록 수정
 * - certificateRouter.get('/certificatelist/:user_id') : 파라미터에 currentUserId를 추가해서 1)본인 페이지 접근 2)다른 유저의 페이지 접근 시 db에서 반환하는 데이터를 구분한다.
 * 
 */
import { Router } from 'express';
import { CertificateService } from '../services/certificateService';
import { login_required } from '../middlewares/login_required';

const certificateRouter = Router();
certificateRouter.use(login_required);

// 클라이언트로 넘어온 정보들로 바탕으로 db에 저장하고 반환값을 클라이언트에게 돌려준다.
certificateRouter.post('/certificate/create', async function (req, res, next) {
  try {
    // id, title, description, when_date 클라이언트에게 받는다.
    const { user_id, title, description, when_date, isPrivate } = req.body;

    // db로 가기 전 각 자격증을 구별하기 위해서 CertificateService로 넘겨준다.
    const newCertificate = await CertificateService.addCertificate({
      user_id,
      title,
      description,
      when_date,
      isPrivate,
    });

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});
// 클라이언트로 넘어온 자격증 id로 db에 그에 맞는 자격증 정보를 클라이언트에게 돌려준다.
certificateRouter.get('/certificates/:id', async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const certificate = await CertificateService.getCertificate({
      certificateId,
    });

    res.status(200).send(certificate);
  } catch (err) {
    next(err);
  }
});

certificateRouter.put('/certificates/:id', async function (req, res, next) {
  try {
    const certificateId = req.params.id;

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;
    const isPrivate = req.body.isPrivate ?? null;

    const toUpdate = { title, description, when_date, isPrivate };
    const certificate = await CertificateService.setCertificate({
      certificateId,
      toUpdate,
    });
    res.status(200).json(certificate);
  } catch (err) {
    next(err);
  }
});

certificateRouter.get(
  '/certificatelist/:user_id',
  async function (req, res, next) {
    try {
      //req에서 currentUserId 가져오기, login_required 파일 참고
      const currentUserId =req.currentUserId;
      const user_id = req.params.user_id;
      const certificateList = await CertificateService.getCertificateList({ currentUserId, user_id });
      res.status(200).send(certificateList);
    } catch (err) {
      next(err);
    }
  }
);

// 해당 certificate 아이디에 맞는 certificate를 삭제하고 성공 메시지 반환
certificateRouter.delete('/certificates/:id', async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const certificateId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await CertificateService.deleteCertificate({
      certificateId,
    });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };
