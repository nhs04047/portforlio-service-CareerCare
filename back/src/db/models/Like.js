// /*
  
//   천준석
//   2022/03/23
// */
// import {LikeModel} from "../schemas/like";

// class Like {
//   // 현재 클릭한 user 객체와 클릭 당한 user의 객체로 새로운 like 객체 생성
//   static async create({now, other}) {
//     const createdLike = await LikeModel.create({now, other});
//     return createdLike;
//   }
//   // 현재 클릭한 user 객체와 클릭 당한 user의 객체로 create한 Like 객체가 LikeModel에 있다면(이미 좋아요를 눌렀다는 의미) 해당 객체 반환, 없다면 null 반환
//   static async findByUser({now, other}) {
//     const like = await LikeModel.findOne({ $and : [{now}, {other}],
//     });
//     console.log(like);
//     return like;
//   }
//   // Like 객체 삭제
//   static async deleteById({liked}){
//     const deleteResult = await LikeModel.deleteOne({liked});
//     const isDataDeleted = deleteResult.deletedCount === 1;
//     return isDataDeleted; 
//   }
// }

// export {Like};

import { LikeModel } from "../schemas/like";

class Like {
  static async create({ currentUser, otherUser }) {
    const createdNewLike = await LikeModel.create({
      currentUser,
      otherUser,
    });
    return createdNewLike;
  }
  static async findByUser({ currentUser, otherUser }) {
    const like = await LikeModel.findOne({
      $and: [{ currentUser }, { otherUser }],
    });

    return like;
  }
  static async deleteById({ isLiked }) {
    console.log("isLiked :" , isLiked);
    const deleteResult = await LikeModel.deleteOne({
      _id: isLiked._id,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Like };

