/*
학력 서비스, 학력 컨트롤러(educationRouter.js)로부터 전달된 요청에 로직을 적용

2022/03/17
김보현
*/
import {Education} from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService{
  
  // db에 학력 정보 생성
  static async addEducation({user_id, school, major, degree}){
    
    const id = uuidv4();

    const newEducation = {
      id,
      user_id,
      school,
      major,
      degree
    };
    const createdNewEducation = await Education.create({newEducation});

    return createdNewEducation;
  }

  //db에서 id로 학력정보 찾기
  static async getEducation({educationId}){
    const education = await Education.findById({educationId})
    if(!education){
      const errorMessage = "해당 id를 가진 학력 정보는 없습니다."
      return { errorMessage }
    }
    return education
  }

  // db에서 user_id로 학력 정보들 찾기
  static async getEducationList({ user_id }) {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  //db에서 학력 정보 id로 데이터 유무 판단, 객체 요소가 null이 아니면 변경사항 보내기
  static async setEducation({educationId, toUpdate }) {
    let education = await Education.findById({ educationId });

    if (!education) {
      const errorMessage =
      "해당 id를 가진 학력 정보는 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    return education;
  }

}

export { EducationService };