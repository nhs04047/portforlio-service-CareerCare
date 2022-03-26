/*
* <임시 비밀번호 이메일 발송 모듈>
* 작성자 : 장정민
* 작성일 : 2022.03.24
*/

import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
  //gmail stmp 서버 설정하기
  service: "gmail",
  host: "smtp.gmail.com",
  port: "587",
  secure: true,
  tls: {
    rejectUnauthorize: false,
  },

  //이메일 전송을 위해 필요한 인증정보
  //gmail 계정과 암호
  auth: {
    user: "eliceTest@gmail.com",
    pass: "testelice123",
  },
});

export {smtpTransport};
