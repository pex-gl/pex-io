var isPlask = require('is-plask')
var plask = require('plask-wrap')

function loadImageBrowser (url, callback, crossOrigin) {
  var img = new window.Image()
  if (crossOrigin) {
    img.crossOrigin = 'anonymous'
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
  try {
    var img = plask.SkCanvas.createFromImage(path)
    img.data = bgra2rgba(img.width, img.height, img.pixels)
    callback(null, img)
  } catch(e) {
    callback(e + ' ' + '"' + path + '"', null)
  }
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

module.exports = loadImage
