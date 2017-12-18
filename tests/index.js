/**
* Tests Part of Deep Scan Package
*
* Author: Alexandre PENOMBRE <aluzed@gmail.com>
* Copyright (c) 2017
*/
const assert = require('assert');
const chai   = require('chai');
const expect = chai.expect;
const DeepScan = require('../');
const path = require('path');

describe('Deep Scan Lib', () => {
  describe('Test scan', () => {

    // No filter
    it('Should find 6 files', () => {
      let filesList = [];

      DeepScan(path.join(__dirname, 'test_scan'), filepath => filesList.push(filepath), [], 'IGNORE');

      expect(filesList.length).to.equal(6);
    });

    // Filter 'ONLY'
    it('Should find 3 files', () => {
      let filesList = [];

      // Should find a.test, b.test, c.test
      DeepScan(path.join(__dirname, 'test_scan'), filepath => filesList.push(filepath), ['^.{1}\\.test$'], 'ONLY');

      expect(filesList.length).to.equal(3);
    })

    // Filter 'IGNORE' on all files starting with 'not...'
    it('Should find 4 files', () => {
      let filesList = [];

      // ignore the 2 files starting with not
      DeepScan(path.join(__dirname, 'test_scan'), filepath => filesList.push(filepath), ['^not'], 'IGNORE');

      expect(filesList.length).to.equal(4);
    });

    // Filter 'IGNORE' all files like a.test, b.test, c.test and files starting with 'not...'
    it('Should find 1 file', () => {
      let filesList = [];

      // ignore the 2 files starting with not
      DeepScan(path.join(__dirname, 'test_scan'), filepath => filesList.push(filepath), ['^.{1}\\.test$', '^not'], 'IGNORE');

      expect(filesList.length).to.equal(1);
    });
  });

  describe('Test limit', () => {

    // ignore over 3 layers
    it('Should find 6 files', () => {
      let filesList = [];

      // will ignore : test_limit/a/b/c/d/ and test_limit/b/c/d/e/
      DeepScan(path.join(__dirname, 'test_limit'), filepath => filesList.push(filepath), [], 'IGNORE', 3);

      expect(filesList.length).to.equal(6);
    });

    // ignore over 3 layers and b.test in both a and b folders
    it('Should find 4 files', () => {
      let filesList = [];

      // will ignore : test_limit/a/b/c/d/ and test_limit/b/c/d/e/
      // and ignore all the b.test files
      DeepScan(path.join(__dirname, 'test_limit'), filepath => filesList.push(filepath), ['^b.test$'], 'IGNORE', 3);

      expect(filesList.length).to.equal(4);
    });
  });
});
