/*
* <project CRUD 구현>
* <project 비공개 설정 구현>
* 작성자 : 장정민
* 작성일 : 2022.03.23
* findManyByAnotherUserId() : 현재 로그인한 유저아이디와 열람하려는 페이지의 유저아이디가 다른 경우 호출하는 함수
*/

import { ProjectModel } from '../schemas/project';

class Project {
  /*
  * create()
  *새로운 project를 생성하고 return하는 함수
  */
  static async create({ newProject }) {
    return ProjectModel.create(newProject);
  }

  /*
  * findOneById()
  *project 컬렉션에서 project_id와 매칭되는 document 하나를 찾고 return하는 함수
  */
  static async findOneById({ projectId }) {
    return ProjectModel.findOne({ id: projectId });
  }

  /*
  * findManyByUserId()
  *매개변수로 보낸 user_id(로그인한 본인의 currentUserId)와 매칭되는 project 컬렉션의 documents를 return하는 함수
  */
  static async findManyByUserId({ user_id }) {
    return ProjectModel.find({ user_id });
  }
  
  /*
  * findManyByAnotherUserId()
  *매개변수로 보낸 user_id(네트워크 페이지에서 접근가능한 다른 유저의 Id)의 project 컬렉션 documents를 return하는 함수
  */
  static async findManyByAnotherUserId({ user_id }) {
    //ProjectModel에서 isPrivate : "true" 인, 즉 비공개인 데이터는 리턴하지 않는다.
    return ProjectModel.find({ user_id: user_id, isPrivate : false });
  }

  /*
  * update()
  *기존의 project를 수정하고 수정한 project를 return 하는 함수
  *findOneAndUpdate() 메소드를 이용해 수정한 project인 updatedProject를 반환한다.
  */
  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  /*
  * deleteOneById()
  *project 컬렉션에서 project_id와 매칭되는 document 하나를 삭제하는 함수
  */
  static async deleteOneById({ projectId }) {
    const deleteResult = await ProjectModel.deleteOne({ id: projectId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Project };
