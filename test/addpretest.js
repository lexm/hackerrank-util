'use strict';

const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const addPrefix = addCode.addPrefix;

const baseMsg = 'Linux Shell > Bash > Compute the Average';

describe('addPrefix', function() {
  it('should add "Solution to " when no second parameter', function(done) {
    expect(addPrefix(baseMsg)).to.equal('Solution to Linux Shell > Bash > Compute the Average');
    done();
  });
  it('should add "Solution to " when second parameter is 0', function(done) {
    expect(addPrefix(baseMsg, 0)).to.equal('Solution to Linux Shell > Bash > Compute the Average');
    done();
  });
  it('should add "Attempt 1: " when second parameter is 1', function(done) {
    expect(addPrefix(baseMsg, 1)).to.equal('Attempt 1: Linux Shell > Bash > Compute the Average');
    done();
  });
  it('should add "Attempt 2: " when second parameter is 2', function(done) {
    expect(addPrefix(baseMsg, 2)).to.equal('Attempt 2: Linux Shell > Bash > Compute the Average');
    done();
  });
  it('should add "Attempt 3: " when second parameter is 3', function(done) {
    expect(addPrefix(baseMsg, 3)).to.equal('Attempt 3: Linux Shell > Bash > Compute the Average');
    done();
  });
  it('should add "Attempt 4: " when second parameter is 4', function(done) {
    expect(addPrefix(baseMsg, 4)).to.equal('Attempt 4: Linux Shell > Bash > Compute the Average');
    done();
  });
  it('should add "Attempt 5: " when second parameter is 5', function(done) {
    expect(addPrefix(baseMsg, 5)).to.equal('Attempt 5: Linux Shell > Bash > Compute the Average');
    done();
  });
})
