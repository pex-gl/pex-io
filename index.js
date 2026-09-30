/** @module pex-io */

const ok = async (response) =>
  response.ok
    ? response
    : Promise.reject(
        new Error(
          `GET ${response.url} ${response.status}${response.statusText ? ` (${response.statusText})` : ""}`,
        ),
      );

/**
 * Load an item and parse the Response as text.
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<string>}
 */
export const loadText = async (url, fetchOptions) =>
  await (await ok(await fetch(url, fetchOptions))).text();

/**
 * Load an item and parse the Response as json.
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<JSON>}
 */
export const loadJson = async (url, fetchOptions) =>
  await (await ok(await fetch(url, fetchOptions))).json();

/**
 * Load an item and parse the Response as arrayBuffer.
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<ArrayBuffer>}
 */
export const loadArrayBuffer = async (url, fetchOptions) =>
  await (await ok(await fetch(url, fetchOptions))).arrayBuffer();

/**
 * Load an item and parse the Response as bytes.
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<Uint8Array>}
 */
export const loadBytes = async (url, fetchOptions) =>
  await (await ok(await fetch(url, fetchOptions))).bytes();

/**
 * Load an item and parse the Response as blob.
 * @function
 * @param {RequestInfo} url
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<Blob>}
 */
export const loadBlob = async (url, fetchOptions) =>
  await (await ok(await fetch(url, fetchOptions))).blob();

/** @private */
const loadMediaElement = async (
  type,
  element,
  readyEvent,
  urlOrProperties,
  fetchOptions,
) => {
  let url = urlOrProperties;
  if (urlOrProperties.url) {
    const { url: propertiesUrl, ...rest } = urlOrProperties;
    url = propertiesUrl;
    Object.assign(element, rest);
  }

  const signal = fetchOptions?.signal;

  let src = url;
  if (fetchOptions) {
    const blob = await loadBlob(url, fetchOptions);
    signal?.throwIfAborted();
    src = URL.createObjectURL(blob);
  }

  return await new Promise((resolve, reject) => {
    const controller = new AbortController();
    const listenerOptions = { signal: controller.signal };
    const dispose = () => {
      controller.abort();
      if (fetchOptions) URL.revokeObjectURL(src);
    };

    element.addEventListener(
      readyEvent,
      () => {
        dispose();
        resolve(element);
      },
      listenerOptions,
    );
    element.addEventListener(
      "error",
      (event) => {
        dispose();
        const reason = element.error?.message;
        reject(
          new Error(
            `Failed to load ${type}: ${url}${reason ? ` (${reason})` : ""}`,
            { cause: event },
          ),
        );
      },
      listenerOptions,
    );
    signal?.addEventListener(
      "abort",
      () => {
        dispose();
        element.removeAttribute("src");
        element.load?.();
        reject(signal.reason);
      },
      listenerOptions,
    );

    element.src = src;
  });
};

/**
 * Create and load a HTML Image. If fetchOptions are specified, load and parse
 * the Response as blob to set the "src" property.
 *
 * @function
 * @param {string | import("./types.js").ImageOptions} urlOrImageProperties
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = async (urlOrImageProperties, fetchOptions) =>
  await loadMediaElement(
    "image",
    new Image(),
    "load",
    urlOrImageProperties,
    fetchOptions,
  );

/**
 * Create and load a HTML Video. If fetchOptions are specified, load and parse
 * the Response as blob to set the "src" property.
 *
 * @function
 * @param {string | import("./types.js").VideoOptions} urlOrVideoProperties
 * @param {RequestInit} [fetchOptions]
 * @returns {Promise<HTMLVideoElement>}
 */
export const loadVideo = async (urlOrVideoProperties, fetchOptions) =>
  await loadMediaElement(
    "video",
    document.createElement("video"),
    "canplaythrough",
    urlOrVideoProperties,
    fetchOptions,
  );

/** @private */
const LOADERS_MAP = {
  text: loadText,
  json: loadJson,
  image: loadImage,
  video: loadVideo,
  blob: loadBlob,
  arrayBuffer: loadArrayBuffer,
  bytes: loadBytes,
};
const LOADERS_MAP_KEYS = Object.keys(LOADERS_MAP);

/**
 * Loads resources from a named map.
 *
 * @example
 *
 * ```js
 * const resources = {
 *   hello: { text: "assets/hello.txt" },
 *   data: { json: "assets/data.json" },
 *   img: { image: "assets/tex.jpg" },
 *   video: { image: "assets/video.mp4" },
 *   blob: { blob: "assets/blob" },
 *   hdrImg: {
 *     arrayBuffer: "assets/tex.hdr",
 *     options: { mode: "no-cors" },
 *   },
 *   bytes: { bytes: "assets/tex.hdr" },
 * };
 *
 * const res = await io.load(resources);
 * res.hello; // => string
 * res.data; // => Object
 * res.img; // => HTMLImageElement
 * res.video; // => HTMLVideoElement
 * res.blob; // => Blob
 * res.hdrImg; // => ArrayBuffer
 * res.bytes; // => Uint8Array
 * ```
 *
 * @function
 * @param {Object<string, import("./types.js").Resource>} resources
 * @returns {Promise<Object<string, import("./types.js").LoadedResource>>}
 */
export const load = (resources) => {
  const names = Object.keys(resources);

  return Promise.allSettled(
    names.map(async (name) => {
      const res = resources[name];
      const loader = LOADERS_MAP_KEYS.find((loader) => res[loader]);
      if (loader) return await LOADERS_MAP[loader](res[loader], res.options);
      return Promise.reject(
        new Error(`io.load: unknown resource type "${Object.keys(res)}".
Resource needs one of ${LOADERS_MAP_KEYS.join("|")} set to an url.`),
      );
    }),
  ).then((values) =>
    Object.fromEntries(
      Array.from(
        values.map((v) => (v.status === "fulfilled" ? v.value : v.reason)),
        (v, i) => [names[i], v],
      ),
    ),
  );
};
