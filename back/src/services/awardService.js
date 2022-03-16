/*
  awardRouter에서 넘어온 정보들로 특정 로직을 구성하여 Award.js에서 처리 후 awardRouter로 return
  천준석
  2022/03/16
*/

import {Award} from "../db"
import { v4 as uuidv4 } from "uuid"; // 중복되지 않는 아이디 값 사용을 위해 import

class AwardService {
  // user_id, title, description를 받아서 새로운 award 데이터 생성
  static async addAward({user_id, title, description}) {
    // 유니크한 id값 생성
    const id = uuidv4();

    const newAward = {id, user_id, title, description};
    // 새로운 Award 데이터 db에 저장
    const createdNewAward = await Award.create({newAward});

    return createdNewAward;
  }

  // awardId를 통해서 Award 데이터 반환
  static async getAward({awardId}) {
    // findById를 통해 해당 awardId와 같은 Id를 찾아서 데이터 반환
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage = "해당 id를 가진 수상 데이터가 없습니다";
      return {errorMessage};
    }
    return award;
  }
}

export {AwardService};