import { xhrGet, promisify } from "./utils.js";

/**
 * @callback textCallback
 * @param {Error} err
 * @param {string} text
 */

/**
 * Loads a text file
 * @param {string} url
 * @param {textCallback} [callback]
 */
function loadText(url, callback) {
  xhrGet(url, "", (request) => {
    if (request.status === 200) {
      if (callback) callback(null, request.responseText);
    } else {
      callback(new Error(`io.loadText: ${request.statusText} "${url}"`), null);
    }
  });
}

export default promisify(loadText);
