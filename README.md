# Marky-mark

Marky-mark helps you consume all your markdown files used for static-site generation. 

It reads a directory of files with yaml meta-data/front-matter and parses it out. 
And if the extension is a markdown one it'll generate the html of that markdown. 
Add your favorite templating language and markdown parser to make your own static site generator. 

## Usage

Let's assume you have a folder of markdown files that optionally have front-matter/meta-data, looking something like this:

```
--- 
title: Marky Mark. A retrospective.
tags:
	- music
	- 90s
whatever: you want
---

## A Blog Post
 
A blog post about how I can't believe Mark Wahlberg is Marky Mark. 
Written in markdown of course.
```

You can use marky-mark to easily grab all that data and stick it in an array of javascript objects. 
All you have to do is:

```javascript
var mm = require('marky-mark');
var posts = mm.parseDirectorySync(__dirname + "/path/to/posts");
```

or

```javascript
var mm = require('marky-mark');
mm.parseDirectory(__dirname + "/path/to/posts", function(err, posts) {

});
```

Relative paths work too:

```javascript
var posts = mm.parseDirectorySync('../posts');
```

The output will be an array of objects, with each object representing 1 file. 
The front-matter/meta-data is parsed via js-yaml. 
The parsed result is in the meta property, but the original yaml content is stored in the yaml property in case you want to do something with it.

```javascript
// this is what .parseDirectorySync() and .parseDirectory() return
[
  {
    filename: "My Marky Mark post.md",
    yaml: "title: Marky Mark. A retrospective.\ntags: ...",
    markdown: "\n## A Blog Post\n\nA blog post about how I ...",
    content: "<h2>A Blog Post</h2><p>A blog post about how I ...",
    meta: {
      title: "Marky Mark. A retrospective.",
      tags: ["music", "90s"],
      whatever: "you want"
    }
  },
  {
    ... another file's contents ...
  }
]
```

And that's it. It's up to you to do something with all the data marky-mark just read.


## Recommended Pairings

Because marky-mark doesn't do anything but read and parse files meant for static-site generators, you'll want to pair it up with other sweet modules to create your own site generator (the funky-bunch approach).

Here are some suggested modules that are fun to use with marky-mark:

- a templating library ([EJS](https://github.com/visionmedia/ejs), [Jade](https://github.com/visionmedia/jade), [eco](https://github.com/sstephenson/eco), [handlebars](https://github.com/wycats/handlebars.js), [mustache](https://github.com/janl/mustache.js), etc.)
- a date formatting library (such as [moment](https://github.com/moment/moment))
- a build tool ([grunt](https://github.com/gruntjs/grunt))
- a map/reduce or javascript object querying library (I've found [taffydb](https://github.com/typicaljoe/taffydb) to be super helpful. There's also [underscore](https://github.com/jashkenas/underscore) and [lodash](https://github.com/lodash/lodash).)
- a css preprocessor (like [less](https://github.com/less/less.js))

If you want to get even crazier, add an http server and a file-watching thing. 
Then you can generate your site automatically as you write, and see a live preview.
Level up your system and automate your deployment.


## Notes

Right now marky-mark just parses a directory of markdown files, that optionally have front-matter in yaml. 
It was a challenge for myself, and something I found useful.

There are lots of ideas for future development in the code, which is relatively simple and small. 
If anyone wants to add any of these features or add a new one, or improve the code I've already written, feel free. 

Pull requests welcome.


## Installation

```javascript
npm install marky-mark
```


## License 

MIT
