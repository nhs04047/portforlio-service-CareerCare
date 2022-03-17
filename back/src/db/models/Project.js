import { ProjectModel } from "../schemas/project";

class Project {
      /*
       * create()
       *새로운 project를 생성하고 return하는 함수
       */
      static async create({ newProject }) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
      }

      /*
       * findById()
       *project 컬렉션에서 project_id와 매칭되는 document 하나를 찾고 return하는 함수
       */
      static async findById({ projectId }) {
        const project = await ProjectModel.findOne({ id: projectId });
        return project;
      }

      /*
       * findByUserId()
       *매개변수로 보낸 user_id와 매칭되는 project 컬렉션의 documents를 return하는 함수
       */
      static async findByUserId({user_id}) {
        console.log('모델 유저아이디',user_id)
        const projectList = await ProjectModel.find({user_id}).exec();
        console.log(projectList);
        return projectList;
      }

      /*
       * update()
       *기존의 project를 수정하고 수정한 project를 return 하는 함수
       *findOneAndUpdate() 메소드를 이용해 수정한 project인 updatedProject를 반환한다.
       *1. filter 변수 : 수정할 프로젝트의 id
       *2. update 변수 : 수정 할 내용 
       *3. option 변수 : 기본값 false, 값이 true인 경우 수정된 문서를 반환한다.
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
}

export { Project };
