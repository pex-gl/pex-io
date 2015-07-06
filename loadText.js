var isBrowser = require('is-browser');
var fs = require('fs');

function loadTextBrowser(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        if (callback) {
          callback(null, request.responseText);
        }
      }
      else {
        callback('WebIO.loadTextFile error : ' + request.statusText, null);
      }
    }
  };
  request.send(null);
}

function loadTextPlask(path, callback) {
  if (!fs.existsSync(path)) {
    if (callback) {
      return callback('File doesn\t exist', null);
    }
  }
  var data = fs.readFileSync(path, 'utf8');
  if (callback) {
    callback(null, data);
  }
}

module.exports = isBrowser ? loadTextBrowser : loadTextPlask;
