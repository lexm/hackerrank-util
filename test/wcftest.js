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
      "repo": {
        "Linux_Shell": {
          "Bash": {}
        }
      }
    });
    done();
  });
  after(function(done) {
    mock.restore();
    done();
  });
  describe('given test data #1', function() {
    it('should not throw an error', function(done) {
      expect(function() {
        writeCodeFile(testData01, function() {
        });
      }).to.not.throw();
      done();
    })
    it('should have created the file', function(done) {
      fs.access('./repo/Linux_Shell/Bash/bash-tutorials---compute-the-average.sh', function(err) {
        expect(err).to.be.null;
        done();
      });
    });
    it('should have correct data in the file', function(done) {
      fs.readFile('./repo/Linux_Shell/Bash/bash-tutorials---compute-the-average.sh', 'utf8', function(err, data) {
        expect(err).to.be.null;
        expect(data).to.equal(testData01.allCode);
        done();
      })
    });
  });
});
