/*
학력 모델, 학력 서비스(educationService.js)에서의 필요한 데이터 처리 관련 코드 작성

2022/03/16
김보현
*/
import { EducationModel} from "../schemas/education";

class Education {

  //db에 학력 정보 생성 적용
  static async create({newEducation}){
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  //db에서 id로 학력 정보 찾기 적용
  static async findById({educationId}){
    const education = await EducationModel.findOne({ id : educationId});
    return education
  }

  //db에서 user_id로 학력 정보 찾기 적용
  static async findByUserId({ user_id }) {
    const education = await EducationModel.find({ user_id });
    return education;
  }
}

export {Education}