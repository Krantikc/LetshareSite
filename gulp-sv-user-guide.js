var _ = require('underscore');
var cheerio = require('cheerio');
var gutil = require('gulp-util');
var path = require('path');
var PluginError = gutil.PluginError;
var through = require('through2');

var PLUGIN_NAME = 'gulp-sv-user-guide';

module.exports = function(destFilename, language, config) {
  if (!destFilename || typeof destFilename !== 'string') {
    throw new PluginError(PLUGIN_NAME, 'Missing file name for ' + PLUGIN_NAME);
  }
  var mapping = config.mapping;
  if (!mapping) {
    throw new PluginError(PLUGIN_NAME, 'Missing file mapping for ' + PLUGIN_NAME);
  }

  var help = {
    help: config.helpTranslation[language]
  };
  var latestFile;
  var latestMod;
  var filesFound = {};
  _.each(mapping, function(value, key) {
    filesFound[key] = false;
  });

  function bufferContents(file, enc, cb) {
    // ignore empty files
    if (file.isNull()) {
      cb();
      return;
    }

    // streams are not supported
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported by ' + PLUGIN_NAME));
      cb();
      return;
    }

    // set latest file if not already set,
    // or if the current file was modified more recently.
    if (!latestMod || file.stat && file.stat.mtime > latestMod) {
      latestFile = file;
      latestMod = file.stat && file.stat.mtime;
    }

    // add file to concat instance
    var html = file.contents.toString();

    // filter out improper use of the p tag
    html = html.replace('<p class="shortdesc"/>', '');

    // get the content we need and add it to help
    var $_ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    var filename = path.basename(file.path);
    var keys = _.reduce(mapping, function(memo, value, key) {
      if (value === filename) {
        memo.push(key);
      }
      return memo;
    }, []);
    if (keys && keys.length) {
      $_('*').removeAttr('class');
      $_('a').replaceWith(function(){ return $_(this).text(); });
      $_('img').remove();
      var helpItem = {
        title: $_('h1').text(),
        content: $_('h1').next().html()
      };
      _.each(keys, function(key) {
        help[key] = helpItem;
        filesFound[key] = true;
      });
    }

    cb();
  }

  function endStream(cb) {
    // no files passed in, no file goes out
    if (!latestFile) {
      cb();
      return;
    }

    var keys = _.reduce(filesFound, function(memo, value, key) {
      if (!value) {
        memo.push(key);
      }
      return memo;
    }, []);
    if (keys && keys.length) {
      this.emit('error', new PluginError(PLUGIN_NAME,
          'File(s) cannot be found for key(s): ' + keys.join(', ')));
      cb();
      return;
    }

    var joinedFile;

    joinedFile = latestFile.clone({contents: false});
    joinedFile.path = path.join(latestFile.base, destFilename);

    joinedFile.contents = new Buffer(JSON.stringify(help, null, 4));

    this.push(joinedFile);
    cb();
  }

  return through.obj(bufferContents, endStream);
};