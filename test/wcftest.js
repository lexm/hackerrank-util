'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const writeCodeFile = addCode.writeCodeFile;
const mock = require('mock-fs');

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
