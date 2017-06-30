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

const addCode = function(path, message, source, no_commit) {
  exec('cd ' + path + ';git add ' + source, function(error) {
    if(error) console.error(error);
    console.log('added: ' + source);
    if(!no_commit) {
      commitCode(path, message);
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
    let { pathArray, message, filename, allCode} = scriptData;
    let fullPath = makeCodeDir(repo, pathArray);
    fs.writeFile(fullPath + filename, allCode, function(err){
      if(err) throw err;
      console.log('File ' + filename + ' written');
      if(!program.no_add) {
        addCode(fullPath, message, filename, program.add);
        // exec('cd ' + fullPath + ';git add ' + filename, function(error) {
        //   if(error) console.error(error);
        //   if(!program.add) {
        //     commitCode(fullPath, message);
        //   }
        // });
      }
    });
  })
  .parse(process.argv);
