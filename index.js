#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const exec = require('child_process').exec;
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';

program
  .version('0.0.1')
  .arguments('<filename>')
    .option('-a, --add', 'add solution to git without performing commit')
    .option('-c, --commit', 'add and commit solution with git (default)')
    .option('-n, --no_add', 'refrain from running git add')
    .action(function(filename) {
      console.log(`filename: ${filename}`);
      if(program.add) console.log('add option');
      if(program.commit) console.log('commit option');
      if(program.no_add) console.log('no_add option');
    })
    .parse(process.argv);
