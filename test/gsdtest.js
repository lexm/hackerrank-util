'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const addCode = require(__dirname + '/../lib/addcode.js');
const makeCodeDir = addCode.getScriptData;
const mock = require('mock-fs');
