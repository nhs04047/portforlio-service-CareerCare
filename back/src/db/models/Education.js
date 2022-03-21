/*
학력 모델, 학력 서비스(educationService.js)에서의 필요한 데이터 처리 관련 코드 작성

2022/03/17
김보현
*/
import { EducationModel } from '../schemas/education';

class Education {
  //db에 학력 정보 생성 적용
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  //db에서 id로 학력 정보 찾기 적용
  static async findOneById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  //db에서 user_id로 학력 정보 찾기 적용
  static async findManyByUserId({ user_id }) {
    const education = await EducationModel.find({ user_id });
    return education;
  }

  //db에 변경사항 적용
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

  //db에서 학력정보 삭제
  static async deleteOneById({ educationId }) {
    const deleteResult = await EducationModel.deleteOne({ id: educationId });
    // deleteResult의 반환 값이 deletedCount가 있는데, deletedCount 값이 1이면 삭제되었다는 의미이므로 true를 반환한다.
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Education };
