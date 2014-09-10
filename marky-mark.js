/*
	Desired API
		
	var mm = require('marky-mark');
	
	// or maybe you can feed it the content yourself (Not implemented yet)
	var post = mm.parse(stringOfFileContents);
	
	// entire folder of posts
	var posts = mm.parseDirectorySync(__dirname + '/posts');
	
	// the output will be either a single object or array of objects that look like this:
	{
		filename: filename, 
		markdown: '',	// the markdown content of your document, sans meta-data/front-matter
		meta: {}		// any front-matter or meta yaml stuff you put at the top of your doc ends up here
	}
*/
 
var fs = require('fs');
var path = require('path'); 
var yaml = require('js-yaml');
var marked = require('marked');	// markdown processor
var fm = require('file-manifest');
var content = require('./lib/content');

exports.marked = marked;
	
	// parseDirectorySync
	// 
	// you give it a directory, it gives you back an array of post objects
	// Its sync for now. Async later, but I don't think its really necessary.
	// 
	// TODO: param passed should either be a directory path, file path
	// TODO: there should be options for file encoding
	// TODO: there should be an option to traverse the directory provided (maybe?)
	// TODO: there should be a sting parsing option itself. Maybe people want to read markdown stuff from other sources (database, github, etc)
exports.parseDirectorySync = function (postPath) {
  return fm.generate(postPath, { memo: [], patterns: '**/*.md' }, function(options, manifest, file) {
    // Pass encoding as string, which is compatible with node v0.8.x
    var contents = fs.readFileSync(file.fullPath, 'utf8');
    var lines = contents.split('\n');
    var frontMatter = content.getFrontMatter(lines);
    var newContent = lines.join('\n');
    manifest.push({
      filename: file.name,
      filenameExtension: '.md',
      yaml: frontMatter.trim(),
      markdown: newContent.trim(),
      content: marked(newContent).trim(),
      meta: frontMatter ? yaml.load(frontMatter) : {}
    });
    return manifest;
  });
};

exports.parseDirectory = function(postPath, cb) {
  fm.generate(postPath, { memo: [], patterns: '**/*.md' }, function(options, manifest, file, next) {
    // Pass encoding as string, which is compatible with node v0.8.x
    fs.readFile(file.fullPath, 'utf8', function(err, contents) {
      var lines = contents.split('\n');
      var frontMatter = content.getFrontMatter(lines);
      var newContent = lines.join('\n');
      manifest.push({
        filename: file.name,
        filenameExtension: file.ext,
        yaml: frontMatter.trim(),
        markdown: newContent.trim(),
        content: marked(newContent).trim(),
        meta: frontMatter ? yaml.load(frontMatter) : {}
      });
      next(null, manifest);
    });
  }, cb);
};
