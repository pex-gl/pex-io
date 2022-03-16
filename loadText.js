import { promisify } from "./utils.js";

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
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        if (callback) {
          callback(null, request.responseText);
        }
      } else {
        callback(new Error(`loadText error: ${request.statusText}`), null);
      }
    }
  };
  request.send(null);
}

export default promisify(loadText);
