#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';

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

program
  .version('0.0.1')
  .arguments('<filename>')
    .option('-a, --add', 'add solution to git without performing commit')
    .option('-c, --commit', 'add and commit solution with git (default)')
    .option('-n, --no_add', 'refrain from running git add')
    .action(function(filename) {
      var filePath;
      if(filename.indexOf('/') === -1) {
        filePath = process.cwd() + '/' + filename;
      } else {
        filePath = filename;
      }
      console.log(filePath);
      let scriptData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let { pathArray, message, solutionName, allCode} = scriptData;
      let fullPath = makeCodeDir(repo, pathArray);
      fs.writeFile(fullPath + solutionName, allCode, function(err){
        if(err) throw err;
        console.log('File ' + solutionName + ' written');
        // exec('cd ' + fullPath + ';git add ' + filename, function(error) {
        //   if(error) console.error(error);
        //   exec('cd ' + fullPath + ';git commit -m "' + message + '"', function(error) {
        //     if(error) console.error(error);
        //   });
        // });
      });
      if(program.add) console.log('add option');
      if(program.commit) console.log('commit option');
      if(program.no_add) console.log('no_add option');
    })
    .parse(process.argv);
