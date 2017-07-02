'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const getScriptData = addCode.getScriptData;
const mock = require('mock-fs');

describe('getScriptData', function() {
  before(function(done) {
    mock({
      'downloads': {
        'file01.json': 'I am not a JSON file!',
        'file02.json': '{"name": "unknown field","pi": 3.14, "not_hyk": true}',
        'file03.json': '{"progName":"Compute the Average",' +
        '"pathArray":["Linux_Shell","Bash"],' +
        '"message":"Solution to Linux Shell > Bash > Compute the Average",' +
        '"filename":"bash-tutorials---compute-the-average.sh",' +
        '"allCode":"read N\nTOTAL=0\nCOUNT=$N\nwhile [ $COUNT -gt 0 ];' +
        ' do\n  read INT\n  let TOTAL+=$INT\n  let COUNT-=1\ndone\n' +
        'printf \"%.3f\\n\" $(echo \" $TOTAL / $N \" | bc -l)\n"}'
      }
    });
    done();
  });
  after(function(done) {
    mock.restore();
    done();
  });
  describe('when download file does not exist', function() {
    it('should throw an ENOENT error', function(done) {
      expect(function() {
        getScriptData('downloads/file00.json');
      }).to.throw('ENOENT');
      done();
    });
  });
  describe('when download file is not JSON', function() {
    it('should throw an error', function(done) {
      expect(function() {
        getScriptData('downloads/file01.json');
      }).to.throw('Unexpected token');
      done();
    });
  });
});
