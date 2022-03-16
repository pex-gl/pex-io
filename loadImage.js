import { promisify } from "./utils.js";

/**
 * @callback imageCallback
 * @param {Error} err
 * @param {HTMLImageElement} image
 */

/**
 * Loads a HTML Image
 * @param {string} file
 * @param {imageCallback} callback
 */
function loadImage(opts, callback) {
  let crossOrigin = null;
  let url = opts;
  if (url.url) {
    crossOrigin = url.crossOrigin;
    url = url.url;
  }

  const img = new Image();
  if (crossOrigin) {
    img.crossOrigin = crossOrigin;
  }
  img.onerror = () => {
    callback(new Error(`io.loadImage: load error ${url}`), null);
  };
  img.onload = () => {
    callback(null, img);
  };
  img.src = url;
}

export default promisify(loadImage);
