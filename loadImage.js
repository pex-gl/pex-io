var isPlask = require('is-plask');
var plask = isPlask ? require('plask') : {};

function loadImageBrowser(url, callback) {
    var img = new Image();
    img.onload = function() {
        callback(null, img);
    }
    img.src = url;
}

function loadImagePlask(path, callback) {
    try {
        var img = plask.SkCanvas.createFromImage(path);
        callback(null, img);
    }
    catch(e) {
        callback(e + ' ' + '"' + path + '"', null);
    }
}

/**
 * Loads a HTML Image from an url in the borwser, SkCanvas from a file in Plask
 * @param {String} file - url addess (Browser) or file path (Plask)
 * @param {Function} callback - function(err, image) { }
 * @param {Error} callback.err - error if any or null
 * @param {Image|SkCanvas} callback.image - loaded image
 */
function loadImage(file, callback) {
    if (isPlask) {
        loadImagePlask(file, callback);
    }
    else {
        loadImageBrowser(file, callback);
    }
}

module.exports = loadImage;
