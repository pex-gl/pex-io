var isBrowser = require('is-browser');
var plask = isBrowser ? {} : require('plask');

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

module.exports = isBrowser ? loadImageBrowser : loadImagePlask;
