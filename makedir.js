'use strict';

const fs = require('fs');

exports.makeCodeDir = function(repo, pathArray) {
  let codeDir = repo;
  while(true) {
    try {
      fs.statSync(codeDir);
    } catch(e) {
      fs.mkdirSync(codeDir);
    }
    if(!pathArray.length) break;
    codeDir += pathArray.splice(0, 1)[0] + '/';
  }
  return codeDir;
};
