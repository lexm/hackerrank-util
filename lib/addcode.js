'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const fillPath = function(download) {
  if(download.indexOf('/') === -1) {
    return process.cwd() + '/' + download;
  } else {
    return download;
  }
}

const makeCodeDir = function(repo, pathArray) {
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

exports.makeCodeDir = makeCodeDir;

exports.commitCode = function(path, message) {
  exec('cd ' + path + ';git commit -m "' + message + '"', function(error) {
    if(error) {
      console.error(error)
    } else {
      console.log('committed: ' + message);
    }
  });
}

exports.addCode = function(scriptData, callback) {
  exec('cd ' + scriptData.fullPath + ';git add ' + scriptData.filename, function(error) {
    if(error) {
      console.error(error);
    } else {
      console.log('added: ' + scriptData.filename);
      if(!scriptData.add) {
        callback(scriptData.fullPath, scriptData.message)
      }
    }
  });
}

exports.writeCodeFile = function(scriptData, callback) {
  fs.writeFile(scriptData.fullPath + scriptData.filename, scriptData.allCode, function(err){
    if(err) throw err;
    console.log('File ' + scriptData.filename + ' written');
    callback();
  });
}

exports.getScriptData = function(downloadName) {
  let scriptData = JSON.parse(fs.readFileSync(fillPath(downloadName), 'utf8'));
  scriptData.fullPath = makeCodeDir(repo, scriptData.pathArray);
  return scriptData;
}
