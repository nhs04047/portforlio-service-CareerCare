import {ProjectModel} from "../schemas/project";

class Project {
  /*
   * create()
   *새로운 project를 생성하고 return하는 함수
   */
  static async create({newProject}) {
    return ProjectModel.create(newProject);
  }

  /*
   * findOneById()
   *project 컬렉션에서 project_id와 매칭되는 document 하나를 찾고 return하는 함수
   */
  static async findOneById({projectId}) {
    return ProjectModel.findOne({id: projectId});
  }

  /*
   * findManyByUserId()
   *매개변수로 보낸 user_id와 매칭되는 project 컬렉션의 documents를 return하는 함수
   */
  static async findManyByUserId({user_id}) {
    return ProjectModel.find({user_id});
  }

  /*
   * update()
   *기존의 project를 수정하고 수정한 project를 return 하는 함수
   *findOneAndUpdate() 메소드를 이용해 수정한 project인 updatedProject를 반환한다.
   *1. filter 변수 : 수정할 프로젝트의 id
   *2. update 변수 : 수정 할 내용
   *3. option 변수 : 기본값 false, 값이 true인 경우 수정된 문서를 반환한다.
   */
  static async update({projectId, fieldToUpdate, newValue}) {
    const filter = {id: projectId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

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
  static async deleteOneById({projectId}) {
    const deleteResult = await ProjectModel.deleteOne({id: projectId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Project};
