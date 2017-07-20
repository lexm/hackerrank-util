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
  for(let i = 0; i <= pathArray.length; i++) {
    try {
      fs.statSync(codeDir);
    } catch(e) {
      fs.mkdirSync(codeDir);
    }
    if(i < pathArray.length) {
      codeDir += pathArray[i] + '/';
    }
  }
  return codeDir;
};

exports.makeCodeDir = makeCodeDir;

const addPrefix = function(message, prefNum = 0) {
  if(typeof prefNum !== 'number'){
    throw 'prefNum not a number';
  }
  else if(prefNum) {
    return 'Attempt ' + prefNum + ': ' + message;
  } else {
    return 'Solution to ' + message;
  }
}

exports.addPrefix = addPrefix;

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
        callback(scriptData.fullPath, scriptData.fullMessage)
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

exports.getScriptData = function(downloadName, prefNum) {
  let scriptData = JSON.parse(fs.readFileSync(fillPath(downloadName), 'utf8'));
  scriptData.fullPath = makeCodeDir(repo, scriptData.pathArray);
  scriptData.fullMessage = addPrefix(scriptData.message, prefNum);
  return scriptData;
}
