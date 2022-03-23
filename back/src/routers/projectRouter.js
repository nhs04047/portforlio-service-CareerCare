/**
 * <project 비공개 설정 구현>
 * 작성자 : 장정민, 일자 : 2022-03-23
 * - projectRouter.post('/project/create') : req.body에서 isPrivate 필드도 받아와서 리턴
 * - projectRouter.put('/projects/:id') : isPrivate 필드도 업데이트 가능하도록 수정
 * - projectRouter.get('/projectlist/:user_id') : 파라미터에 currentUserId를 추가해서 1)본인 페이지 접근 2)다른 유저의 페이지 접근 시 db에서 반환하는 데이터를 구분한다.
 * 
 */

import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { projectService } from '../services/projectService';

const projectRouter = Router();
projectRouter.use(login_required);

/*
 * project 생성
 * post 요청 - /project/create
 */
projectRouter.post('/project/create', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const { user_id } = req.body;
    const { title } = req.body;
    const { description } = req.body;
    const { projectLink } = req.body;
    const { from_date } = req.body;
    const { to_date } = req.body;
    const { isPrivate } = req.body;

    // 위 데이터를 프로젝트 db에 추가하기
    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      projectLink,
      from_date,
      to_date,
      isPrivate,
    });
    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

/*
 * project id별 조회
 * post 요청 - /projects/:id
 */
projectRouter.get('/projects/:id', async function (req, res, next) {
  try {
    // url로부터 project_Id 를 추출함.
    const projectId = req.params.id;
    const currentProject = await projectService.getProject({ projectId });

    if (currentProject.errorMessage) {
      throw new Error(currentProject.errorMessage);
    }

    res.status(200).send(currentProject);
  } catch (error) {
    next(error);
  }
});

/*
 * project 수정
 * put 요청 - /projects/:id
 */
projectRouter.put('/projects/:id', async function (req, res, next) {
  try {
    // url로부터 project_Id 를 추출함.
    const projectId = req.params.id;

    // body data 로부터 업데이트할 project 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const projectLink = req.body.projectLink ?? null;
    const from_date = req.body.from_date ?? null;
    const to_date = req.body.to_date ?? null;
    const isPrivate = req.body.isPrivate ?? null;

    const toUpdate = { title, description, projectLink, from_date, to_date, isPrivate };

    // 해당 project 아이디로 사용자 정보를 db에서 찾아 업데이트함. 바뀐 부분 없으면 생략한다.
    const Project = await projectService.setProject({ projectId, toUpdate });

    if (toUpdate.errorMessage) {
      throw new Error(Project.errorMessage);
    }
    res.status(200).json(Project);
  } catch (error) {
    next(error);
  }
});

/*
 * projectlist 조회
 * get 요청 - /projectlist/:user_id
 */
projectRouter.get('/projectlist/:user_id', async function (req, res, next) {
  try {
    //req에서 currentUserId 가져오기, login_required 파일 참고
    const currentUserId =req.currentUserId;
    const { user_id } = req.params;

    const projectList = await projectService.getProjectList({ currentUserId, user_id });
    res.status(200).send(projectList);
    
  } catch (error) {
    next(error);
  }
});

/*
 * project 삭제
 * delete 요청 - /projects/:id
 */
projectRouter.delete('/projects/:id', async function (req, res, next) {
  try {
    // url로부터 projectId 를 추출함.
    const projectId = req.params.id;

    //projectId와 매칭되는 프로젝트 정보를 삭제함
    const result = await projectService.deleteProject({ projectId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
