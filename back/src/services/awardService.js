/*
  awardRouter에서 넘어온 정보들로 특정 로직을 구성하여 Award.js에서 처리 후 awardRouter로 return
  천준석
  2022/03/16
*/

import {Award} from "../db"
import { v4 as uuidv4 } from "uuid"; // 중복되지 않는 아이디 값 사용을 위해 import

class AwardService {
  static async addAward({user_id, title, description}) {
    // 유니크한 id값 생성
    const id = uuidv4();

    const newAward = {id, user_id, title, description};
    // 새로운 Award 데이터 db에 저장
    const createdNewAward = await Award.create({newAward});

    return createdNewAward;
  }

  static async getAward({awardId}) {
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage = "해당 id를 가진 수상 데이터가 없습니다";
      return {errorMessage};
    }
    return award;
  }
}

export {AwardService};