/*
 * 학업 모델, 학업 서비스(educationService.js)에서의 필요한 데이터 처리 관련 코드 작성
 *
 * <education CRUD 구현>
 * 작성자 : 김보현
 * 작성일 : 2022.03.17
 * DB(EducationModel)에 새로운 데이터를 저장하거나, 찾거나, 갱신하거나, 삭제하여  EducationService로 return
 *
 * <education 비공개 설정 구현>
 * 작성자 : 장정민
 * 작성자 : 2022.03.23
 * findManyByAnotherUserId() : 현재 로그인한 유저아이디와 열람하려는 페이지의 유저아이디가 다른 경우 호출하는 함수
 */

import { EducationModel } from '../schemas/education';

class Education {
  /*
   * create()
   * db에 학력 정보 생성 적용
   */
  static async create({ newEducation }) {
    return EducationModel.create(newEducation);
  }

  /*
   * findOneById()
   * db에서 id로 학력 정보 찾기 적용
   */
  static async findOneById({ educationId }) {
    return EducationModel.findOne({ id: educationId });
  }

  /*
   * findManyByUserId
   * db에서 user_id로 학력 정보 찾기 적용
   */
  static findManyByUserId({ user_id }) {
    return EducationModel.find({ user_id });
  }

  /*
   * findManyByAnotherUserId()
   * 매개변수로 보낸 user_id(네트워크 페이지에서 접근가능한 다른 유저의 Id)의 project 컬렉션 documents를 return하는 함수
   */
  static async findManyByAnotherUserId({ user_id }) {
    //EducationModel에서 isPrivate : "true" 인, 즉 비공개인 데이터는 리턴하지 않는다.
    return EducationModel.find({ user_id: user_id, isPrivate: false });
  }

  /*
   * update()
   * db에 변경 사항 적용
   */
  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  /*
   * deleteOneById
   * db에서 학력정보 삭제
   */
  static async deleteOneById({ educationId }) {
    const deleteResult = await EducationModel.deleteOne({ id: educationId });
    // deleteResult의 반환 값이 deletedCount가 있는데, deletedCount 값이 1이면 삭제되었다는 의미이므로 true를 반환한다.
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Education };
