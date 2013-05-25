# Marky-mark

Marky-mark helps you consume all your markdown files used for static-site generation.


## Overview

A Node.js module that helps you write your own static site generator. 
Marky-mark reads a directory of markdown files with yaml meta-data/front-matter and parses it out. 
Add your favorite templating language and markdown parser to make your own static site generator. 


## Usage

Let's assume you have a folder of markdown files that optionally have front-matter/meta-data, looking something like this:

```markdown
--- 
title: Marky Mark. A retrospective.
tags:
	- music
	- 90s
whatever: you want
---
 
A blog post about how I can't believe Mark Wahlberg is Marky Mark. 
Written in markdown of course.
```

You can use marky-mark to easily grab all that data and stick it in an array of javascript objects. 
All you have to do is:

```js
var mm = require('marky-mark');
var posts = mm.parseDirectorySync(__dirname + "/path/to/posts");
console.log(JSON.stringify(posts, null, 2));
```

The output will be an array of objects, with each object representing 1 file. 
The front-matter/meta-data is parsed via js-yaml. 
The parsed result is in the meta property, but the original yaml content is stored in the yaml property in case you want to do something with it.

```js
// this is what .parseDirectorySync() returns
[
  {
    filename: "My Marky Mark post.md",
    yaml: "title: Marky Mark. A retrospective.\ntags: ...",
    markdown: "\nA blog post about how I ...",
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

Because marky-mark doesn't do anything but read markdown files meant for static-site generators, you'll want to pair it up with other sweet modules to create your own site generator. 
(I propose that any static site generator built with marky-mark be classified as a funky bunch site generator, or a site generator that uses the funky-bunch approach.)

Here are some suggested modules that are fun to use with marky-mark:

- a markdown processor (such as marked)
- a templating library (EJS, Jade, eco, handlebars, mustache, etc.)
- a date formatting library (such as moment)
- a map/reduce or javascript object querying library (I've found taffydb to be super helpful)
- a css preprocessor (like LESS)

If you want to get even crazier, add an http server and a file-watching thing. 
Then you can generate your site automatically as you write, and see a live preview.
Level up your system and automate your deployment.


## Notes

Right now marky-mark just parses a directory of markdown files, that optionally have front-matter in yaml. 
It was a challenge for myself, and something I found useful.

All file reading is sync only - I didn't think async was necessary here...

There are lots of ideas for future development in the code, which is relatively simple and small. 
If anyone wants to add any of these features or add a new one, or improve the code I've already written, feel free. 

Pull requests welcome.


## Installation

```js
npm install marky-mark
```


## License 

MIT