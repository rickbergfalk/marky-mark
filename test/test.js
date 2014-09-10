var mm = require('../marky-mark.js');
var assert = require('assert');

// Boring array of files
var posts = mm.parseDirectorySync(__dirname + "/posts");
assert.deepEqual(posts[0], {
  filename: "post1",
  filenameExtension: ".md",
  yaml: "date: 2012-01-01\ncategory: test\ntitle: post 1",
  markdown: "This is a test post. The first one.",
  content: "<p>This is a test post. The first one.</p>",
  meta: {
    date: new Date('2012-01-01T00:00:00.000Z'),
    category: "test",
    title: "post 1"
  }
});
assert.deepEqual(posts[1], {
  filename: "post2",
  filenameExtension: ".md",
  yaml: "category: test\ntags:\n- tag 1\n- tag 2\n- tag 3\ntitle: post 2",
  markdown: "This is the second test post. it has more space between the content and front matter. \n\n## h2",
  content: "<p>This is the second test post. it has more space between the content and front matter. </p>\n<h2 id=\"h2\">h2</h2>",
  meta: {
    category: "test",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    title: "post 2"
  }
});
console.log('Sync tests pass');
