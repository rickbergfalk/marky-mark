var mm = require('../marky-mark.js');

// Boring array of files
var posts = mm.parseDirectorySync(__dirname + "/posts");
console.log(JSON.stringify(posts, null, 2));