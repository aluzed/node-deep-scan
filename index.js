/**
* Deep Scan Package
*
* Scan a folder, if match a file, call a callback, otherwise, if match a directory,
* rescan it, and so on...
*
* Author: Alexandre PENOMBRE <aluzed@gmail.com>
* Copyright (c) 2017
*/
const fs = require('fs');
const path = require('path');

/**
* Deep Scan Function
*
* Scan a folder from a given path and executes a callback for each file match
*
* @param {String}   mainPath   first folder to scan
* @param {Function} callback   (filepath) => { ... }
* @param {Array}    filter     regexp string array
* @param {String}   mode       filter mode
* @param {Number}   limit      how many layers
* @constraint mainPath must be type of string
* @constraint callback cannot be undefined
*/
function DeepScan (mainPath, callback, filter, mode, limit) {
  if(typeof mainPath !== 'string')
    throw new Error('mainPath parameter must be type of string.');

  if(typeof callback === 'undefined')
    throw new Error('callback cannot be undefined.');

  if(typeof limit === 'undefined')
    limit = -2;

  if(typeof filter === 'undefined')
    filter = [];

  if(typeof mode === 'undefined')
    mode = 'IGNORE';

  if(limit === -1)
    return;

  if(fs.lstatSync(mainPath).isDirectory()) {
    fs.readdirSync(mainPath).forEach(file => {
      let _filtered_ = null;

      switch(mode) {
        case 'IGNORE' :
          _filtered_ = true;
          break;

        case 'ONLY' :
          if (fs.lstatSync(path.join(mainPath, file)).isFile())
            _filtered_ = false;
          else 
            _filtered_ = true;
          break;
      }

      // If current file is _filtered_
      for(let i of filter) {
        if(file.match(i)) {
          switch(mode) {
            case 'IGNORE' :
              _filtered_ = false;
              break;
            case 'ONLY' :
              _filtered_ = true;
              break;
          }
        }
      }

      // If the current file is not _filtered_
      if(_filtered_) {
        // New absolute path
        let __p = path.join(mainPath, file);

        // If it is a file, callback
        if(fs.lstatSync(__p).isFile())
          callback(__p);

        // If it is a folder, Scan it
        if(fs.lstatSync(__p).isDirectory())
          DeepScan(__p, callback, filter, mode, limit - 1);
      }
    });
  }
}

module.exports = DeepScan;
