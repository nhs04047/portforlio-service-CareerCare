class utile{

  /*
  * user list에서 각각 user 정보에 프로필 이미지 경로 추가 함수
  */
  static addImgPathArr(users, hostName){
    users.map((user) => {   
      user._doc.profileImgPath = "http://" + hostName + "/profileImg/" + user.profileImg;
    })
    return users
  }

  /*
  * user 정보에 프로필 이미지 경로 추가 함수
  */
  static addImgPath(user, hostName){
    user._doc.profileImgPath = "http://" + hostName + "/profileImg/" + user.profileImg;
    return user;
  }
}

export {utile}