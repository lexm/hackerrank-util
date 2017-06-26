'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const mcd = require(__dirname + '/../makedir.js');
const makeCodeDir = mcd.makeCodeDir;
const mock = require('mock-fs');


describe('makeCodeDir', function() {
  before(function(done) {
    mock({
      'hackerrank-repo': {
        '.git': {}
      }
    });
    done();
  });
  after(function(done) {
    mock.restore();
    done();
  });
  describe('when dirs don\'t exist', function() {
    it('should not have created first one yet', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Python/', function(err){
        expect(err.code).to.equal('ENOENT');
        done();
      });
    });
    it('should return the created directory', function(done) {
      var newDir = makeCodeDir('./hackerrank-repo/', ['Python', 'Strings']);
      expect(newDir).to.equal('./hackerrank-repo/Python/Strings/');
      done();
    });
    it('should have created first-level dir', function(done) {
      fs.access('./hackerrank-repo/Python/', function(err) {
        expect(err).to.be.null;
        done();
      });
    })
    it('should have created second-level dir', function(done) {
      fs.access('./hackerrank-repo/Python/Strings/', function(err) {
        expect(err).to.be.null;
        done();
      });
    });
  });
});
