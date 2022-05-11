/**
 * Load an item and parse the Response as text
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} options
 * @returns {Promise<string>}
 */
export const fetchText = async (url, options = {}) =>
  await (await fetch(url, options)).text();

/**
 * Load an item and parse the Response as json
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} options
 * @returns {Promise<JSON>}
 */
export const fetchJson = async (url, options = {}) =>
  await (await fetch(url, options)).json();

/**
 * Load an item and parse the Response as arrayBuffer
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} options
 * @returns {Promise<ArrayBuffer>}
 */
export const fetchArrayBuffer = async (url, options = {}) =>
  await (await fetch(url, options)).arrayBuffer();

/**
 * Load an item and parse the Response as blob
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} options
 * @returns {Promise<Blob>}
 */
export const fetchBlob = async (url, options = {}) =>
  await (await fetch(url, options)).blob();

/**
 * Load an item, parse the Response as blob and create a HTML Image
 * @function
 * @param {string | ImageOptions} urlOrOpts
 * @param {RequestInit} options
 * @returns {Promise<HTMLImageElement>}
 */
export const fetchImage = async (urlOrOpts, options = {}) => {
  const img = new Image();

  let src = urlOrOpts;
  if (urlOrOpts.url) {
    const { url, ...rest } = urlOrOpts;
    src = url;
    try {
      Object.assign(img, rest);
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  }

  const data = await fetchBlob(src, options);

  return await new Promise((resolve, reject) => {
    img.addEventListener("load", function load() {
      img.removeEventListener("load", load);
      resolve(img);
    });
    img.addEventListener("error", function error() {
      img.removeEventListener("error", error);
      reject(img);
    });

    img.src = URL.createObjectURL(data);
  });
};

const LOADERS_MAP = {
  text: fetchText,
  json: fetchJson,
  image: fetchImage,
  blob: fetchBlob,
  binary: fetchArrayBuffer,
};
const LOADERS_MAP_KEYS = Object.keys(LOADERS_MAP);

/**
 * Loads resources from a named map
 * @function
 * @param {Object.<string, Resource>} resources
 * @returns {Promise<Object.<string, LoadedResource>>}
 *
 * @example
 * const resources = {
 *   hello: { text: "assets/hello.txt" },
 *   data: { json: "assets/data.json" },
 *   img: { image: "assets/tex.jpg" },
 *   hdrImg: { binary: "assets/tex.hdr" },
 *   blob: { binary: "assets/blob" },
 * };
 *
 * const res = await io.fetchAll(resources);
 * res.hello; // => DOMString
 * res.data; // => Object
 * res.img; // => HTMLImageElement
 * res.hdrImg; // => ArrayBuffer
 * res.blob; // => Blob
 */
export const fetchAll = (resources) => {
  const names = Object.keys(resources);

  return Promise.allSettled(
    names.map(async (name) => {
      const res = resources[name];
      const loader = LOADERS_MAP_KEYS.find((loader) => res[loader]);
      if (loader) return await LOADERS_MAP[loader](res[loader]);
      return Promise.reject(
        new Error(`io.load: unknown resource type "${Object.keys(res)}".
Resource needs one of ${LOADERS_MAP_KEYS.join("|")} set to an url.`)
      );
    })
  ).then((values) =>
    Object.fromEntries(
      Array.from(
        values.map((v) => v.value || v.reason),
        (v, i) => [names[i], v]
      )
    )
  );
};
