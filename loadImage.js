import { promisify } from "./utils.js";

/**
 * @callback imageCallback
 * @param {Error} err
 * @param {HTMLImageElement} image
 */

/**
 * @typedef {Object} ImageOptions
 * @param {string} url
 * @param {...*} rest {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#properties|HTMLImageElement#properties}
 */

/**
 * Loads a HTML Image
 * @param {string | ImageOptions} urlOrOpts
 * @param {imageCallback} [callback]
 */
function loadImage(urlOrOpts, callback) {
  const img = new Image();

  let src = urlOrOpts;
  if (urlOrOpts.url) {
    const { url, ...rest } = urlOrOpts;
    src = url;
    try {
      Object.assign(img, rest);
    } catch (error) {
      return callback(new Error(error), null);
    }
  }

  img.onerror = () => {
    callback(new Error(`io.loadImage: Load Error "${src}"`), null);
  };
  img.onload = () => {
    callback(null, img);
  };
  img.src = src;
}

export default promisify(loadImage);
