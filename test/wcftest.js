'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const writeCodeFile = addCode.writeCodeFile;
const mock = require('mock-fs');
const home = process.env.HOME;
const repo = process.env.HACKERRANK_REPO || home + '/hackerrank-code/';

const testData01 = {
  "progName": "Compute the Average",
  "pathArray": [ 'Linux_Shell', 'Bash' ],
  "message": "Solution to Linux Shell > Bash > Compute the Average",
  "filename": "bash-tutorials---compute-the-average.sh",
  "fullPath": repo + "Linux_Shell/Bash",
  "allCode": "read N\nTOTAL=0\nCOUNT=$N\nwhile [ $COUNT -gt 0 ]; do\n  read INT\n  let TOTAL+=$INT\n  let COUNT-=1\ndone\nprintf \"%.3f\\n\" $(echo \" $TOTAL / $N \" | bc -l)\n"
}

describe('writeCodeFile', function() {
  before(function(done) {
    mock({
      repo: {}
    });
    done();
  });
  after(function(done) {
    mock.restore();
    done();
  });
});
