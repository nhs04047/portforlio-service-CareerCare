/*
  두 유저가 좋아요 관계인지 아닌지 알기 위한 함수
  좋아요라면 -> 좋아요 객체 반환, 아니라면 -> null 반환
  천준석
  2022/03/25
*/

import { LikeModel } from "../schemas/like";

class Like {
  // 좋아요 버튼을 클릭한 user와 좋아요를 받은 user로 like 객체 생성
  static async create({ currentUser, otherUser }) {
    const createdNewLike = await LikeModel.create({
      currentUser,
      otherUser,
    });
    return createdNewLike;
  }

  // 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체가 LikeModel안에 있다면 like 객체 반환/ 아니면 null 반환
  static async findByUser({ currentUser, otherUser }) {
    const like = await LikeModel.findOne({
      $and: [{ currentUser }, { otherUser }],
    });
    return like;
  }
  // 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체 삭제
  static async deleteById({ isLiked }) {
    const deleteResult = await LikeModel.deleteOne({
      _id : isLiked._id,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Like };

