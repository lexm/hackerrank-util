#!/usr/bin/env node
const program = require('commander');
const {
  commitCode,
  addCode,
  writeCodeFile,
  getScriptData
} = require(__dirname + '/lib/addcode')
var tryNum;

program
  .version('0.0.1')
  .arguments('<downloadName>')
  .option('-a, --add', 'add solution to git without performing commit')
  .option('-c, --commit', 'add and commit solution with git (default)')
  .option('-n, --no_add', 'refrain from running git add')
  .option('-t, --try <trynum>', 'attempt <number>')
  .action(function(downloadName) {
    if(program.try) {
      tryNum = program.trynum;
    } else {
      tryNum = 0
    }
    const scriptData = getScriptData(downloadName, tryNum);
    writeCodeFile(scriptData, function() {
      if(!scriptData.no_add) {
        addCode(scriptData, commitCode);
      }
    });
  })
  .parse(process.argv);
