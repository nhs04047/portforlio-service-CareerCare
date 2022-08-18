import sharp from "sharp";
import fs from "fs";

function imgResizing(filePath) {
  sharp(filePath) // 압축할 이미지 경로
    .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
    .withMetadata() // 이미지의 exif데이터 유지
    .toBuffer((err, buffer) => {
      if (err) throw err;
      // 압축된 파일 새로 저장(덮어씌우기)
      fs.writeFile(filePath, buffer, (err) => {
        if (err) throw err;
      });
    });
}

export { imgResizing };
