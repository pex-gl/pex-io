var loadImage = require('./loadImage')
var loadBinary = require('./loadBinary')
var loadText = require('./loadText')
var loadJSON = require('./loadJSON')

/**
 * Load provided resources
 * @param   {Object} resources - map of resources, see example
 * @param   {Function} callback function(err, resources), see example
 * @returns {Object}   - with same properties are resource list but resolved to the actual data
 *
 * @example
 * var resources = {
 *   img     : { image: __dirname + '/tex.jpg'},
 *   hdrImg  : { binary: __dirname + '/tex.hdr'}
 *   data    : { json: __dirname + '/data.json'},
 *   hello   : { text: __dirname + '/hello.txt'}
 * }
 * load(resources, function(err, res) {
 *   res.img    //{Image} in a Browser or {SkCanvas} in Plask
 *   res.hdrImg //{ArrayBuffer}
 *   res.data   //{JSON}
 *   res.hello  //{String}
 * })
 */
function load (resources, callback) {
  var results = {}
  var errors = {}
  var hadErrors = false

  // TODO: use `async` module instead?
  var loadedResources = 0
  var resourceNames = Object.keys(resources)
  var numResources = resourceNames.length

  function onFinish () {
    try {
      if (hadErrors) {
        callback(errors, null)
      } else {
        callback(null, results)
      }
    } catch (e) {
      console.log(e)
      console.log(e.stack)
    }
  }

  resourceNames.forEach(function (name) {
    function onLoaded (err, data) {
      if (err) {
        hadErrors = true
        errors[name] = err
      } else {
        results[name] = data
      }

      if (++loadedResources === numResources) {
        onFinish()
      }
    }

    var res = resources[name]
    if (res.image) {
      loadImage(res.image, onLoaded)
    } else if (res.text) {
      loadText(res.text, onLoaded)
    } else if (res.json) {
      loadJSON(res.json, onLoaded)
    } else if (res.binary) {
      loadBinary(res.binary, onLoaded)
    } else {
      onLoaded('pex-io/load unknown resource type ' + Object.keys(res), null)
    }
  })

  if (resourceNames.length === 0) {
    onFinish()
  }
}

module.exports = load
