import { xhrGet, promisify } from "./utils.js";

/**
 * @callback jsonCallback
 * @param {Error} err
 * @param {Object} json
 */

/**
 * Loads JSON data
 * @param {string} url
 * @param {jsonCallback} [callback]
 * @returns {Promise<Object> | undefined}
 */
function loadJSON(url, callback) {
  xhrGet(url, "json", (request) => {
    if (request.status === 200) {
      if (callback) callback(null, request.response);
    } else {
      callback(new Error(`io.loadJSON: ${request.statusText} "${url}"`), null);
    }
  });
}

export default promisify(loadJSON);
