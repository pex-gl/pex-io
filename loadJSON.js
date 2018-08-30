var loadText = require('./loadText')
var promisify = require('./utils/promisify')

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
      var json = null
      try {
        json = JSON.parse(data)
      } catch (e) {
        return callback(e, null)
      }
      callback(null, json)
    }
  })
}

module.exports = promisify(loadJSON)
