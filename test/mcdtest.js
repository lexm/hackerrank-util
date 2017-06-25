'use strict';


const expect = require('chai').expect;
const mcd = require(__dirname + '/../makedir.js');
const makeCodeDir = mcd.makeCodeDir;
const mock = require('mock-fs');


describe('testing makeCodeDir', function() {
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
  })
  it('should be able to create new directories', function() {
    var newDir = makeCodeDir('./hackerrank-repo/', ['Python', 'Strings']);
    expect(newDir).to.equal('./hackerrank-repo/Python/Strings/');
  });
});
