// /*
//   summary : 좋아요를 위한 좋아요 스키마 
//   author : 천준석
//   date : 2022/03/23
// */
// import mongoose from "mongoose";
// import { model, Schema } from "mongoose";

// const LikeSchema = new Schema(
//   {
//     nowId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'UserModel',
//     },
//     otherId : {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'UserModel',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const LikeModel = model("Like", LikeSchema);

// export { LikeModel };
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    otherUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };

