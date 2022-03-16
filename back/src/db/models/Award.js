/*
  awardService에서 매개변수로 넘어온 입력값에 맞게 DB(AwardModel)에 새로운 데이터를 저장하거나, 찾거나, 갱신하거나, 삭제하여 awardService로 return
  천준석
  2022/03/16
*/
import {AwardModel} from "../schemas/award";

class Award {
  // 새로운 수상이력에 대한 정보를 DB에 만들고 return
  static async create({newAward}) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  // DB에 awardId와 같은 award document 하나의 객체를 return
  static async findById({awardId}) {
    const award = await AwardModel.findOne({id: awardId});

    return award;
  }
  
  // DB에 awardId와 같은 award document 하나의 객체를 넘어온 파라미터에 맞게 수정하여 return
  static async update({awardId, fieldToUpdate, newValue}) {
    // findOneAndUpdate 함수의 필수 매개변수 선언(filter, update)
    // filter : awardId와 id가 같은 조건, update : 필드명에 맞는 새로운 값으로 갱신, option : ?
    const filter = {id: awardId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false}; 

    // db에서 findOneAndUpdate(filter, update, option)에 맞게 수정된 데이터 반환
    const updatedAward = await AwardModel.findOneAndUpdate(
      filter, update, option
    );

    return updatedAward;
  }

  // AwardModel.find을 사용하여 db에서 해당 user_id에 알맞는 award 목록을 획득.
  static async findByUserId({user_id}) {
    const awards = await AwardModel.find({user_id});
    return awards;
  }
}

export {Award}