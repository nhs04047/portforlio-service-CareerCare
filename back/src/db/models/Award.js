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

  static async findById({awardId}) {
    const award = await AwardModel.findOne({id: awardId});

    return award;
  }
}

export {Award}