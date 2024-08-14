const fs = require('fs');

const cleanUp = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.rm(dirPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error cleaning up directory ${dirPath}:`, err);
        return reject(err);
      }
      console.log(`Directory ${dirPath} cleaned up successfully.`);
      resolve();
    });
  });
};

module.exports = {
  cleanUp,
};
