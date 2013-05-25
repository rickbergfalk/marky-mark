var mm = require('../marky-mark.js');
var posts = mm.parseDirectorySync(__dirname + "/posts");
console.log(JSON.stringify(posts, null, 2));