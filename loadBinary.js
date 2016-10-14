var isPlask = require('is-plask')
var fs = require('fs')

function toArrayBuffer (buffer) {
  var ab = new ArrayBuffer(buffer.length)
  var view = new Uint8Array(ab)
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i]
  }
  return ab
}

function loadBinaryBrowser (url, callback) {
  var request = new window.XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'
  request.onreadystatechange = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(null, request.response)
      } else {
        callback('loadBinary error : ' + request.response, null)
      }
    }
  }
  request.send(null)
}

function loadBinaryPlask (file, callback) {
  try {
    if (!fs.existsSync(file)) {
      if (callback) {
        return callback('loadBinary error: File doesn\t exist', null)
      }
    }
  } catch(e) {
    return callback('loadBinary error : ' + e.toString(), null)
  }
  var rawData = fs.readFileSync(file)
  var data = toArrayBuffer(rawData)
  callback(null, data)
}

/**
 * Loads binary data
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, data) { }
 * @param {Error} callback.err - error if any or null
 * @param {ArrayBuffer} callback.data - loaded binary data
 */
function loadBinary (file, callback) {
  if (isPlask) {
    loadBinaryPlask(file, callback)
  } else {
    loadBinaryBrowser(file, callback)
  }
}

module.exports = loadBinary
