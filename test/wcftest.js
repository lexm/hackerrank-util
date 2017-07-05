'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const writeCodeFile = addCode.writeCodeFile;
const mock = require('mock-fs');
const repo1 = './repo/'

const testData01 = {
  "progName": "Compute the Average",
  "pathArray": [ 'Linux_Shell', 'Bash' ],
  "message": "Solution to Linux Shell > Bash > Compute the Average",
  "filename": "bash-tutorials---compute-the-average.sh",
  "fullPath": repo1 + "Linux_Shell/Bash/",
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
  describe('given test data #1', function(done) {
    writeCodeFile(testData01, function() {
      it('should have create the first-level subdirectory', function() {
        fs.access('./repo/Linux_Shell/', function(err) {
          expect(err).to.be.null;
          done();
        });
      });
    });
  });
});
