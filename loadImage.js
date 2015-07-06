var isBrowser = require('is-browser');
var plask = isBrowser ? {} : require('plask');

function loadImageBrowser(url, callback) {
    var img = new Image();
    img.onload = function() {
        callback(null, img);
    }
    img.src = url;
}

function loadImagePlask(url, callback) {
    var img = plask.SkCanvas.createFromImage(url);
    callback(null, img);
}

module.exports = isBrowser ? loadImageBrowser : loadImagePlask;
