var isPlask = require('is-plask')
var plask = require('plask-wrap')
var promisify = require('./utils/promisify')

function loadImageBrowser (opts, callback) {
  var crossOrigin = null
  var url = opts
  if (url.url) {
    crossOrigin = url.crossOrigin
    url = url.url
  }

  var img = new window.Image()
  if (crossOrigin) {
    img.crossOrigin = crossOrigin
  }
  img.onerror = function () {
    callback(new Error('Failed to load ' + url), null)
  }
  img.onload = function () {
    callback(null, img)
  }
  img.src = url
}

function bgra2rgba (width, height, pixels) {
  var rgba = new Uint8Array(width * height * 4)
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var i = (x + y * width) * 4
      rgba[i + 0] = pixels[i + 2]
      rgba[i + 1] = pixels[i + 1]
      rgba[i + 2] = pixels[i + 0]
      rgba[i + 3] = pixels[i + 3]
    }
  }
  return rgba
}

function loadImagePlask (path, callback) {
  var img
  try {
    img = plask.SkCanvas.createFromImage(path)
    img.data = bgra2rgba(img.width, img.height, img.pixels)
  } catch (e) {
    callback(new Error(e + ' ' + '"' + path + '"'), null)
  }
  callback(null, img)
}

/**
 * Loads a HTML Image from an url in the borwser, SkCanvas from a file in Plask
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, image) { }
 * @param {Error} callback.err - error if any or null
 * @param {Image|SkCanvas} callback.image - loaded image
 */
function loadImage (file, callback, crossOrigin) {
  if (isPlask) {
    loadImagePlask(file, callback)
  } else {
    loadImageBrowser(file, callback, crossOrigin)
  }
}

module.exports = promisify(loadImage)
