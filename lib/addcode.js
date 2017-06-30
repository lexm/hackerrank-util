'use strict';

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
