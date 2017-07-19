'use strict';

const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const addPrefix = addCode.addPrefix;

const baseMsg = 'Linux Shell > Bash > Compute the Average';

describe('addPrefix', function() {
  it('should add "Solution to " when no second parameter', function() {
    expect(addPrefix(baseMsg).to.equal('Solution to Linux Shell > Bash > Compute the Average'));
  });
  it('should add "Solution to " when second parameter is 0', function() {
    expect(addPrefix(baseMsg, 0).to.equal('Solution to Linux Shell > Bash > Compute the Average'));
  });
  it('should add "Attempt 1: " when second parameter is 1', function() {
    expect(addPrefix(baseMsg, 0).to.equal('Attempt 1: Linux Shell > Bash > Compute the Average'));
  });
  it('should add "Attempt 1: " when second parameter is 2', function() {
    expect(addPrefix(baseMsg, 0).to.equal('Attempt 2: Linux Shell > Bash > Compute the Average'));
  });
  it('should add "Attempt 1: " when second parameter is 3', function() {
    expect(addPrefix(baseMsg, 0).to.equal('Attempt 3: Linux Shell > Bash > Compute the Average'));
  });
  it('should add "Attempt 1: " when second parameter is 4', function() {
    expect(addPrefix(baseMsg, 0).to.equal('Attempt 4: Linux Shell > Bash > Compute the Average'));
  });
  it('should add "Attempt 1: " when second parameter is 5', function() {
    expect(addPrefix(baseMsg, 0).to.equal('Attempt 5: Linux Shell > Bash > Compute the Average'));
  });
})
