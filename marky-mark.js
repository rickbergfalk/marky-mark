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

var markyMark = {
	
	marked: marked,
	
	// parseDirectorySync
	// 
	// you give it a directory, it gives you back an array of post objects
	// Its sync for now. Async later, but I don't think its really necessary.
	// 
	// TODO: param passed should either be a directory path, file path
	// TODO: there should be options for file encoding
	// TODO: there should be an option to traverse the directory provided (maybe?)
	// TODO: there should be a sting parsing option itself. Maybe people want to read markdown stuff from other sources (database, github, etc)
	// TODO: add async option for file/directory
	parseDirectorySync: function (postPath) {
		var posts = [];
		var postFilenames = fs.readdirSync(postPath);
		postFilenames.forEach(function(filename) {		
			var filepath = path.join(postPath,filename);
			if (!fs.lstatSync(filepath).isDirectory()) {
				var extname = path.extname(filename);
				var contents = fs.readFileSync(filepath, {encoding: 'utf8'});
				var parsedContent = {
					filename: filename.replace(extname, ''),
					filenameExtension: extname,
					yaml: '',
					markdown: '', 
					content: '',
					meta: {}
				};
				var lines = contents.split('\n');	
				// If the first line is a front matter deal, 
				// collect all the lines for yaml-parsing til we reach the next ---
				// we'll keep shifting lines from the front of the array and collecting them,
				// until we reach the next ---. Then we stop and leave the rest for the markdown content
				var frontMatter = '';
				if (lines[0].trim() === '---') {
					var firstFrontMatterMarker = lines.shift();
					var line = '';
					while (line !== '---') {
						frontMatter = frontMatter + line + "\n"; // since we split by \n we'll add it back here and stay true to the source doc
						line = lines.shift().trim();
					}
				}
				parsedContent.yaml = frontMatter;
				parsedContent.meta = yaml.load(frontMatter);
				
				// handle what's left of the file...
				// if its markdown stick the markdown where it belongs, and the generated content in the content property
				if (extname === '.md' || extname === 'markdown' || extname === 'mdown' || extname === 'mkdn' || extname === 'mkd') {
					parsedContent.markdown = lines.join('\n');
					parsedContent.content = marked(parsedContent.markdown);
				} else {
					parsedContent.content = lines.join('\n');
				}
				posts.push(parsedContent);
			}
		});
		
		return posts;
	}
	
};

 
// commonJS module systems
// (Is this still a good way of doing this sort of thing?)
if (typeof module !== 'undefined' && "exports" in module) {
	module.exports = markyMark;
}