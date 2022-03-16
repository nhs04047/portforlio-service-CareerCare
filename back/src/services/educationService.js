/*
학력 서비스, 학력 컨트롤러(educationRouter.js)로부터 전달된 요청에 로직을 적용

2022/03/16
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

  static async getEducationList({educationId}){
    const education = await Education.findByUserId({educationId})
    if(!education){
      const errorMessae = "해당 id를 가진 학력 정보는 없습니다."
      return { errorMessage }
    }
  }

  // db에서 학력 정보들 찾기
  static async getEducationList({ user_id }) {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

}

export { EducationService };