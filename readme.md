## Deep Scan Package

### Why ?

Because, you can do whatever you want with retreived files. Require, Read, call another function, etc... as you will get a callback with the full path.

### Installation

```
npm i -S deep-scan
```

### Parameters

| Parameter | Type            | Details                                                                         |
|-----------|:----------------|:--------------------------------------------------------------------------------|
| Fullpath  | String          | Path of the main directory to scan                                              |
| Callback  | Function        | (_ABSOLUTE_FILE_PATH) => { ... }                                                |
| Filter    | Array of String | String regexp like : '^m\\.js$'                                                 |
| Mode      | String          | 'IGNORE' (default) or 'ONLY'. Note that 'ONLY' works only if the path is a file |
| Limit     | Number          | Max directory depth                                                             |

### How to use

```javascript

const DeepScan = require('deep-scan');
const path = require('path');

// This example will require all the files in test_scan folder that does not start with not
DeepScan(path.join(__dirname, 'test_scan'), filepath => {
  require(filepath.replace(/\.js$/, ''));
}, ['^not']);

```

### Examples

**Get only images in the 5 first directories and call our compress function**
```javascript
DeepScan(
  path.join(__dirname, 'image_folder'), // main path
  imgpath => { imgLib.compress(imgpath); log(`${imgpath} compressed`); },  // callback
  ['.{1,}\\.bmp', '.{1,}\\.png', '.{1,}\\.jpg'], // filter rules
  'ONLY', // mode
  5 // our limit
);
```
