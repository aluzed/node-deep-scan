### Require example

Here is our folder :

```
current
|
|__ helpers
|   |__ decoder.js
|   |__ encoder.js
|   |__ lib-compress.js
|   |__ lib-splitter.js
|   |__ lib-decompress.js
|
|__ models
    |__ posts.js
    |__ roles.js
    |__ users.js
    |__videos.js
```

```javascript
const deepScan = require('deep-scan');
const path = require('path');

// require all files starting with lib-
deepScan(
  // First parameter : path
  path.join(__dirname, 'helpers'),
  // Second parameter : file callback
  filepath => { require(filepath); },
  // Regex rules array (get all js files starting with 'lib-' and ending with '.js' 
  ['^lib-(.+)\\.js$'],
  // Type of filter (only in our case)
  'ONLY');
```
