import { xhrGet, promisify } from "./utils.js";

/**
 * @callback binaryCallback
 * @param {Error} err
 * @param {ArrayBuffer} data
 */

/**
 * Loads binary data
 * @param {string} file
 * @param {binaryCallback} [callback]
 */
function loadBinary(url, callback) {
  xhrGet(url, "arraybuffer", (request) => {
    if (request.status === 200) {
      if (callback) callback(null, request.response);
    } else {
      callback(new Error(`io.loadBinary: ${request.statusText} "${url}"`), null);
    }
  });
}

export default promisify(loadBinary);
