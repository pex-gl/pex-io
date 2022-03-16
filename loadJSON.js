import loadText from "./loadText.js";
import { promisify } from "./utils.js";

/**
 * @callback jsonCallback
 * @param {Error} err
 * @param {string} json
 */

/**
 * Loads JSON data
 * @param {string} file
 * @param {jsonCallback} callback
 */
function loadJSON(file, callback) {
  loadText(file, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      let json = null;
      try {
        json = JSON.parse(data);
      } catch (e) {
        return callback(e, null);
      }
      callback(null, json);
    }
  });
}

export default promisify(loadJSON);
