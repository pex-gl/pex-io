var isPlask = require('is-plask')
var fs = require('fs')

function loadTextBrowser (url, callback) {
  var request = new window.XMLHttpRequest()
  request.open('GET', url, true)
  request.onreadystatechange = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        if (callback) {
          callback(null, request.responseText)
        }
      } else {
        callback('loadText error: ' + request.statusText, null)
      }
    }
  }
  request.send(null)
}

function loadTextPlask (path, callback) {
  if (!fs.existsSync(path)) {
    if (callback) {
      return callback('loadText error: File doesn\'t exist ' + '"' + path + '"', null)
    }
  }
  var data = fs.readFileSync(path, 'utf8')
  if (callback) {
    callback(null, data)
  }
}

/**
 * @desc Loads text string
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, text) { }
 * @param {Error} callback.err - error if any or null
 * @param {String} callback.text - loaded text
 */
function loadText (file, callback) {
  if (isPlask) {
    loadTextPlask(file, callback)
  } else {
    loadTextBrowser(file, callback)
  }
}

module.exports = loadText
