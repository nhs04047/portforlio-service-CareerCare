/*
 * Education MVP 서비스
 *
 * <Education CRUD 구현>
 * 작성자 : 김보현
 * 작성일 : 2022.03.16
 * educationRouter에서 넘어온 정보들로 특정 로직을 구성하여 Education.js에서 처리 후 educationRouter로 return
 *
 * <education 비공개 설정 구현>
 * 작성자 : 장정민, 일자 : 2022-03-23
 * addEducation 함수 : education 컬렉션 db에 isPrivate필드 추가로 저장
 * getEducationList 함수 : 읽기 권한을 구분하기 위해 현재 로그인한 currentUserId와 params에서 받아오는 user_id의 데이터 반환함수를 분리함.
 */

import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService {
  /*
   * addEducation()
   *db에 학력 정보 생성
   */
  static async addEducation({ user_id, school, major, position, isPrivate }) {
    const id = uuidv4();

    const newEducation = {
      id,
      user_id,
      school,
      major,
      position,
      isPrivate,
    };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  /*
   * getEducation()
   * db에서 id로 학력정보 찾기
   */
  static async getEducation({ educationId }) {
    const education = await Education.findOneById({ educationId });
    if (!education) {
      const errorMessage = "해당 id를 가진 학력 정보는 없습니다.";
      return { errorMessage };
    }
    return education;
  }

  /*
   * getEducationList()
   * db에서 user_id로 학력 정보들 찾기
   */
  static async getEducationList({ currentUserId, user_id }) {
    //currentUserId와 user_id가 동일하면 => isPrivate 필터링 없이 모든 데이터 반환
    if (currentUserId == user_id) {
      return Education.findManyByUserId({ user_id });
    }
    //currentUserId와 user_id가 동일하지 않으면 => isPrivate 필터링 처리한 데이터 반환
    else {
      return Education.findManyByAnotherUserId({ user_id });
    }
  }

  /*
   * setEducation()
   * db에서 학력 정보 id로 데이터 유무 판단, 객체 요소가 null이 아니면 변경사항 보내기
   */
  static async setEducation({ educationId, toUpdate }) {
    let education = await Education.findOneById({ educationId });

    if (!education) {
      const errorMessage = "해당 id를 가진 학력 정보는 없습니다.";
      return { errorMessage };
    }

    const myKeys = Object.keys(toUpdate);
    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]] !== null) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        education = await Education.update({
          educationId,
          fieldToUpdate,
          newValue,
        });
      }
    }

    return education;
  }

  /*
   * deleteEducation()
   * db에서 educationId로 학력 정보를 찾아 삭제
   */
  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteOneById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage = "해당 id를 가진 데이터는 없습니다.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { EducationService };
