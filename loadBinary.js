import { promisify } from "./utils.js";

/**
 * @callback binaryCallback
 * @param {Error} err
 * @param {ArrayBuffer} data
 */

/**
 * Loads binary data
 * @param {string} file
 * @param {binaryCallback} callback
 */
function loadBinary(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(null, request.response);
      } else {
        callback(new Error(`io.loadBinary: ${request.response}`), null);
      }
    }
  };
  request.send(null);
}

export default promisify(loadBinary);
