var loadText = require('./loadText')

/**
 * Loads JSON data
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, json) { }
 * @param {Error} callback.err - error if any or null
 * @param {String} callback.json - loaded JSON data
 */
function loadJSON (file, callback) {
  loadText(file, function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      try {
        var json = JSON.parse(data)
        callback(null, json)
      } catch(e) {
        callback(e.toString(), null)
      }
    }
  })
}

module.exports = loadJSON
