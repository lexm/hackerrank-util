#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';
const makeCodeDir = require(__dirname + '/lib/makedir').makeCodeDir;
const fillPath = require(__dirname + '/lib/fillpath').fillPath;

const commitCode = function(path, message) {
  exec('cd ' + path + ';git commit -m "' + message + '"', function(error) {
    if(error) {
      console.error(error)
    } else {
      console.log('committed: ' + message);
    }
  });
}

const addCode = function(scriptData) {
// const addCode = function(path, message, source, no_commit) {
  exec('cd ' + scriptData.fullPath + ';git add ' + scriptData.filename, function(error) {
    if(error) {
      console.error(error);
    } else {
      console.log('added: ' + scriptData.filename);
      if(!scriptData.add) {
        commitCode(scriptData.fullPath, scriptData.message);
      }
    }
  });
}

const writeCodeFile = function(scriptData) {
// const writeCodeFile = function(path, message, filename, allCode, noAdd, justAdd) {
  fs.writeFile(scriptData.fullPath + scriptData.filename, scriptData.allCode, function(err){
    if(err) throw err;
    console.log('File ' + scriptData.filename + ' written');
    if(!scriptData.no_add) {
      addCode(scriptData);
      // addCode(path, message, filename, justAdd);
    }
  });
}

program
  .version('0.0.1')
  .arguments('<downloadName>')
  .option('-a, --add', 'add solution to git without performing commit')
  .option('-c, --commit', 'add and commit solution with git (default)')
  .option('-n, --no_add', 'refrain from running git add')
  .action(function(downloadName) {
    let scriptData = JSON.parse(fs.readFileSync(fillPath(downloadName), 'utf8'));
    // let { pathArray, message, filename, allCode} = scriptData;
    scriptData.fullPath = makeCodeDir(repo, scriptData.pathArray);
    writeCodeFile(scriptData);
    // writeCodeFile(fullPath, message, filename, allCode, program.no_add, program.add);
  })
  .parse(process.argv);
