const path = require('path');
const fs = require('fs/promises');
const logger = require('../settings/logger');

async function getProfileImageUrl(profileImageUrl) {
  if (!profileImageUrl) return ''; // 없으면 빈 문자열

  const folderpath = path.join('src', 'public');
  const imagePath = path.join(folderpath, profileImageUrl);

  try {
    // 이미지 경로가 유효하면 해당 url 반환
    await fs.access(imagePath);
    return profileImageUrl;
  } catch (error) {
    // 그렇지 않으면 빈 문자열 반환
    logger.error(`Error accessing profile image`, error);
    return '';
  }
}

module.exports = getProfileImageUrl;
