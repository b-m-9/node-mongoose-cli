var fs = require('fs');
var root = __dirname + '/../';

// build up the directory structure
module.exports = function init() {
  var dir = fs.readdirSync('./');
  var modelDir = dir.indexOf('db');
  if (modelDir !== -1) return;
  fs.mkdirSync('./db');
  fs.mkdirSync('./db/models');
  fs.mkdirSync('./db/seed');
  fs.mkdirSync('./db/migrations');
  this.setUri('');
  fs.createReadStream(root + 'templates/seedfile.js').pipe(fs.createWriteStream('db/seed/seedfile.js'));
  fs.createReadStream(root + 'templates/dropfile.js').pipe(fs.createWriteStream('db/seed/dropfile.js'));
  fs.createReadStream(root + 'templates/repl.js').pipe(fs.createWriteStream('db/seed/repl.js'));
  fs.createReadStream(root + 'templates/all-models.js').pipe(fs.createWriteStream('db/index.js'));
}