#!/usr/bin/env node
const program = require('commander');

program
  .version('0.0.1')
  .arguments('<filename>')
    .option('-a, --add', 'perform \'git add\' on file')
    .option('-c, --commit', 'perform "git commit" (assumes --add)')
    .option('-n, --no_add', 'refrain from running git add')
    .action(function(filename) {
      console.log(`filename: {filename}`);
      if(program.add) console.log('add option');
      if(program.commit) console.log('commit option');
      if(program.no_add) console.log('no_add option');
    })
    .parse(process.argv);
