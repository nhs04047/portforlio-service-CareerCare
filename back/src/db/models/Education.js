/*
학력 모델, 학력 서비스(educationService.js)에서의 필요한 데이터 처리 관련 코드 작성

2022/03/16
김보현
*/
import { EducationModel} from "../schemas/education";

class Education {

  //db에 학력정보 생성 적용
  static async create({newEducation}){
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const education = await EducationModel.find({ user_id });
    return education;
  }
}

export {Education}