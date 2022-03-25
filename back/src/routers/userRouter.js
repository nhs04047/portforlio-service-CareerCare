/*
 * <password 재발급 및 이메일 전송 구현>
 * 작성자 : 장정민
 * 일자 : 2022-03-24
 * userAuthRouter.post("/users/newPassword")
 *
 * <user 검색, 프로필 이미지 변경 구현> 
 * 작성자 : 김보현
 * 일자 : 2022-03-25
 * 
 */

import is from '@sindresorhus/is';
import { query, Router } from 'express';
import sharp from 'sharp'
import fs from 'fs'
import { login_required } from '../middlewares/login_required';
import {upload} from '../middlewares/uploadProfileImg';
import { userAuthService } from '../services/userService';
import {smtpTransport} from './smtpTransport';

const userAuthRouter = Router();

/*
*회원가입 컨트롤러
*/
userAuthRouter.post('/user/register', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    const { name, email, password } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

/*
* 로그인 컴포넌트
*/
userAuthRouter.post('/user/login', async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

/*
* user 리스트 반환 컴포넌트
*/
userAuthRouter.get(
  '/userlist',
  login_required,
  async function (req, res, next) {
    try {

      const hostName = req.headers.host;

      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers({hostName});
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

/*
* user 이름으로 user 리스트 검색 컴포넌트
*/
userAuthRouter.get(
  '/userlist/search/:name/:option',
  login_required,
  async function( req, res, next){
    try{
      const user_name = req.params.name;
      const sortingOption = req.params.option;

      const hostName = req.headers.host;

      const searchedUsers = await userAuthService.getSearchedUsers({
        user_name,
        sortingOption
      }, hostName);
      res.status(200).send(searchedUsers);
    }catch(error){
      next(error);
    }
  }
)

/*
* 사용자 정보 반환 컴포넌트
*/
userAuthRouter.get(
  '/user/current',
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

/*
* user 정보 수정 컴포넌트
*/
userAuthRouter.put(
  '/users/:id',
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;

      const hostName = req.headers.host;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate }, hostName);

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

/*
* user 정보 반환 컴포넌트 
*/
userAuthRouter.get(
  '/users/:id',
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const hostName = req.headers.host;

      const currentUserInfo = await userAuthService.getUserInfo({ user_id }, hostName);

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }
      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

/*
* user 정보 반환 컴포넌트 
* 클라이언트로부터 현재 비밀번호와 변경할 비밀번호를 입력 받아 userAuthService로 넘겨주고 반환 값으로 errormessage(해당 id 없을 때)/false(현재 비밀번호가 일치하지 않을 때)/true(일치하고 비밀번호가 잘 변경되었을 때)를 return 해준다.
*/ 
userAuthRouter.put(
  '/users/password/:id',
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;

      const {pw, newPw} = req.body;

      const toUpdate = {pw, newPw};

      const updatedPassword = await userAuthService.setPassword({user_id, toUpdate});
      // console.log(updatedPassword); // 현재 비밀번호가 맞을 때 true, 현재 비밀번호가 다를 때 false
      res.status(200).json(updatedPassword);
    } catch (error) {
      next(error);
    }
  }
)

/*
* user 프로필 이미지 리사이징 후 변경 컴포넌트
*/
userAuthRouter.put(
  '/users/profileImg/:id',
  login_required,
  upload.single("img"),
  async function (req, res, next){
    try{

      sharp(req.file.path)  // 압축할 이미지 경로
      .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
      .withMetadata()	// 이미지의 exif데이터 유지
      .toBuffer((err, buffer) => {
        if (err) throw err;
        // 압축된 파일 새로 저장(덮어씌우기)
        fs.writeFile(req.file.path, buffer, (err) => {
          if (err) throw err;
        });
      });

      const user_id = req.params.id;  
      const profileImg = req.file.filename;

      const hostName = req.headers.host;

      const profileImgPath = "http://" + hostName + "/profileImg/" + profileImg
      const toUpdate = {    // 프로필 이미지 이름과 이미지 경로를 서비스로 전송
        profileImg,
        profileImgPath
      };
      const uploadedImg = await userAuthService.setProfileImg({user_id, toUpdate});
      
      res.status(200).json(uploadedImg);
    }catch(error){
      next(error)
    }
  }
)

/*
* user 프로필 사진 불러오기 컴포넌트
*/
userAuthRouter.get(
  '/users/profileImg/:id',
  login_required,
  async function(req, res, next){
    try{
      const user_id = req.params.id;
      const hostName = req.headers.host;

      const profileImgURL = await userAuthService.getProfileImgURL({user_id}, hostName)
      res.send(profileImgURL)
    }catch(error){
      next(error)
    }
  }
)

/*
* user 삭제 컴포넌트
*/
userAuthRouter.delete(
  '/users/:id',
  //login_required,
  async function (req, res, next){
    try{
      const user_id = req.params.id;
      //유저 삭제하는 메소드 호출
      await userAuthService.deleteUser({ user_id });

      //유저 mvp 정보 삭제하는 메소드 호출
      await userAuthService.deleteUserAllInfo({ user_id });
      
      res.status(200).send();

    } catch (error){
      next(error);
    }
  }
);

/*
* password 변경 컴포넌트
*/
userAuthRouter.post("/users/newpassword", async function (req, res, next) {
  try {
    //form에서 받아온 이메일 저장
    const email = req.body.idEmail;
    const name= req.body.idName;

    //1)받아온 이메일이 db에 존재하는지 확인하고 2)새 비밀번호를 업데이트할 함수
    const {newPassword,updatedUser} = await userAuthService.setNewPassword({email});

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    //메일옵션 => 아래 내용이 수신됨
    const mailOption = {
      from: "eliceTest@gmail.com",
      to: email,
      subject: `[포트폴리오 웹] ${name}님 임시 비밀번호가 생성되었습니다.`,
      html:`
      <h1>임시비밀번호</h1>
      임시 비밀번호 : ${newPassword}
      `
    };

    smtpTransport.sendMail(mailOption, (err, res) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("Message send :" + res);
      }
      smtpTransport.close();
    });

    res.status(200).send({
      result:"ok"
    });

  } catch (err) {
    console.log("err", err);
  }
});

/*
* likes 관리 컴포넌트
* 현재 상태를 나타내는 status와 likeCount 반환 / user의 status/likeCount 정보 갱신
*/
userAuthRouter.put("/like/:id", login_required, async function (req, res, next) {
  try {
    // 좋아요를 클릭한 사람의 id
    const currentUserId = req.params.id;
    // 좋아요를 받은 사람의 id
    const otherUserId = req.body.otherUserId;
    // 현재 상태를 나타내는 status와 likeCount 반환
    const updatedUser = await userAuthService.setLike({
      currentUserId,
      otherUserId,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

/*
* likeCount 반환 컴포넌트
* 현재 상태를 나타내는 status와 likeCount 반환
*/

userAuthRouter.get("/like/:id", login_required, async function (req, res, next) {
  try {
    // 좋아요를 받은 사람의 id
    const otherUserId = req.params.id;
    const currentUserId = req.currentUserId;
    // console.log("get currentUserId : " , currentUserId);
    const updatedLike = await userAuthService.getLike({
      currentUserId,
      otherUserId,
    });

    res.status(200).json(updatedLike);
  } catch (error) {
    next(error);
  }
});
// // 좋아요를 받는 user_id를 입력받아 누가 좋아요을 줬는지 name, id 객체 배열 반환
// userAuthRouter.get("/likelist/:id", login_required, async function (req, res, next) {
//   try {

/*
* 좋아요를 누른 user 목록 반환 컴포넌트
* 현재 상태를 나타내는 status와 likeCount 반환
*/
// userAuthRouter.get("/likelist/:id", login_required, async function (req, res, next) {
//   try {

//     const userId = req.params.id;

//     const updatedData = await userAuthService.getlikeList({
//       userId,
//     });
//     console.log(updatedData.liked);
//     res.status(200).json(updatedData.liked);
//   } catch (error) {
//     next(error);
//   }
// });


// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});


export { userAuthRouter };
