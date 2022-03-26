/*
*
* <이미지 URL반환 모듈 작성
* 작성자 : 김보현
* 작성일 : 2022.03.26
*
*/

import fs from "fs"

class utile{

  /*
  * user list에서 각각 user 정보에 프로필 이미지 경로 추가 함수
  */
  static addImgPathArr(users, hostName){

    users.map((user) => {
      // 이미지 파일 유무 확인
      let imgStatus = fs.existsSync(`./uploads/profile_img/${user.profileImg}`) 
      if(imgStatus){
        user._doc.profileImgPath = "http://" + hostName + "/profileImg/" + user.profileImg;
      }else{
        user._doc.profileImgPath = "http://" + hostName + "/profileImg/default_img/default_profile_img.jpg";
      }

    })
    return users
  }

  /*
  * user 정보에 프로필 이미지 경로 추가 함수
  */
  static addImgPath(user, hostName){
    // 이미지 파일 유무 확인
    let imgStatus = fs.existsSync(`./uploads/profile_img/${user.profileImg}`) 
      if(imgStatus){
        user._doc.profileImgPath = "http://" + hostName + "/profileImg/" + user.profileImg;
      }else{
        user._doc.profileImgPath = "http://" + hostName + "/profileImg/default_img/default_profile_img.jpg";
      }
    return user;
  }
}

export {utile}