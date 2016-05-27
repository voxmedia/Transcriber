/*
* Simple script to automate the deployment of the app.
*/
var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
  files: ['./**'], // simple-glob format
  // platforms: ['osx32', 'osx64', 'win32', 'win64', 'linux32', 'linux64']
  platforms: ['osx64']
});

nw.build().then(function () {
  console.log('all done!');
}).catch(function (error) {
  console.error(error);
});
