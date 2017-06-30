'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const makeCodeDir = addCode.makeCodeDir;
const mock = require('mock-fs');

describe('makeCodeDir', function() {
  before(function(done) {
    mock({
      'hackerrank-repo': {
        '.git': {},
        'Algorithms': {},
        'Data_Structures': {
          'Arrays': {}
        }
      }
    });
    done();
  });
  after(function(done) {
    mock.restore();
    done();
  });
  describe('when dirs don\'t exist', function() {
    it('should not have created the path yet', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Python/Strings/', function(err){
        if(err) {
          expect(err.code).to.equal('ENOENT');
          done();
        } else {
          expect(err).to.not.be.null;
          done();
        }
      });
    });
    it('should not have created first one either', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Python/', function(err){
        if(err) {
          expect(err.code).to.equal('ENOENT');
          done();
        } else {
          expect(err).to.not.be.null;
          done();
        }
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
  describe('when only top dir exists', function() {
    it('should not have created the path yet', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Algorithms/Strings/', function(err){
        if(err) {
          expect(err.code).to.equal('ENOENT');
          done();
        } else {
          expect(err).to.not.be.null;
          done();
        }
      });
    });
    it('should have created first dir already', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Algorithms/', function(err){
        expect(err).to.be.null;
        done();
      });
    });
    it('should return the created directory', function(done) {
      var newDir = makeCodeDir('./hackerrank-repo/', ['Algorithms', 'Warmup']);
      expect(newDir).to.equal('./hackerrank-repo/Algorithms/Warmup/');
      done();
    });
    it('should have created new second-level dir', function(done) {
      fs.access('./hackerrank-repo/Algorithms/Warmup/', function(err) {
        expect(err).to.be.null;
        done();
      });
    });
  });
  describe('when both dirs exist', function() {
    it('should have created first dir already', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Data_Structures/', function(err){
        expect(err).to.be.null;
        done();
      });
    });
    it('should have created second dir already', function(done) {
      var fn1 = fs.access('./hackerrank-repo/Data_Structures/Arrays/', function(err){
        expect(err).to.be.null;
        done();
      });
    });
    it('should return the created directory', function(done) {
      var newDir = makeCodeDir('./hackerrank-repo/', ['Data_Structures', 'Arrays']);
      expect(newDir).to.equal('./hackerrank-repo/Data_Structures/Arrays/');
      done();
    });
  });
});
