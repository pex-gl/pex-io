import loadText from "./loadText.js";
import loadJSON from "./loadJSON.js";
import loadImage from "./loadImage.js";
import loadBinary from "./loadBinary.js";
import { promisify } from "./utils.js";

/**
 * @private
 */
const LOADERS_MAP = {
  text: loadText,
  json: loadJSON,
  image: loadImage,
  binary: loadBinary,
};
const LOADERS_MAP_KEYS = Object.keys(LOADERS_MAP);

/**
 * @typedef {Object} Resource
 * @property {string} [text]
 * @property {string} [json]
 * @property {string} [image]
 * @property {string} [binary]
 */
/**
 * @typedef {DOMString | Object | HTMLImageElement | ArrayBuffer} LoadedResource
 */

/**
 * @callback resourceCallback
 * @param {Error} err
 * @param {Object.<string, LoadedResource>} res
 */

/**
 * Loads resources from a named map
 * @param {Object.<string, Resource>} resources
 * @param {resourceCallback} callback
 * @returns {Promise<Object.<string, LoadedResource>> | undefined}
 *
 * @example
 * const resources = {
 *   hello: { text: "assets/hello.txt" },
 *   data: { json: "assets/data.json" },
 *   img: { image: "assets/tex.jpg" },
 *   hdrImg: { binary: "assets/tex.hdr" },
 * };
 *
 * io.load(resources, (err, res) => {
 *   res.hello; // => DOMString
 *   res.data; // => Object
 *   res.img; // => HTMLImageElement
 *   res.hdrImg; // => ArrayBuffer
 *   if (err) return console.log(err);
 * });
 */
function load(resources, callback) {
  const names = Object.keys(resources);

  Promise.allSettled(
    names.map(async (name) => {
      const res = resources[name];

      const loader = LOADERS_MAP_KEYS.find((loader) => res[loader]);
      if (loader) return await LOADERS_MAP[loader](res[loader]);
      return Promise.reject(
        new Error(
          `io.load: unknown resource type "${Object.keys(res)}".
Resource needs one of ${LOADERS_MAP_KEYS.join("|")} set to an url.`
        )
      );
    })
  ).then((values) => {
    const results = Object.fromEntries(
      Array.from(
        values.map((v) => v.value || v.reason),
        (v, i) => [names[i], v]
      )
    );
    callback(
      values.find((v) => v.status === "rejected") ? results : null,
      results
    );
  });
}

export default promisify(load);
