const multer = require('multer');
const path = require('path');

class MulterConfig {
  constructor(uploadDir = './src/public/uploads', fieldName = 'profileImage') {
    this.uploadDir = uploadDir;
    this.fieldName = fieldName;
    this.storage = this.createStorage();
    // 단일 파일 업로드, 필드 이름은 'profileImage'
    this.upload = multer({ storage: this.storage }).single('profileImage');
  }

  createStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + '-' + Date.now() + path.extname(file.originalname),
        );
      },
    });
  }

  getUploadHandler() {
    return this.upload;
  }
}

module.exports = MulterConfig;
