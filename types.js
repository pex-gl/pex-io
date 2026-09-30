/**
 * @typedef {object} ImageOptions
 * @property {string} url
 * @property {...*} rest {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#properties|HTMLImageElement#properties}
 */
/**
 * @typedef {object} VideoOptions
 * @property {string} url
 * @property {string} [readyEvent="canplaythrough"] Event resolving the promise. "canplaythrough" might never fire depending on "preload" and platform policies (eg. iOS, data saver): use an earlier event like "loadedmetadata" or "canplay" instead.
 * @property {...*} rest {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video|HTMLVideoElement#properties}
 */

/**
 * @typedef {object} Resource
 * @property {string} [text]
 * @property {string} [json]
 * @property {string | ImageOptions} [image]
 * @property {string | VideoOptions} [video]
 * @property {string} [blob]
 * @property {string} [arrayBuffer]
 * @property {string} [bytes]
 * @property {RequestInit} [options] {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#parameters|Request#parameters}
 */
/**
 * @typedef {string | object | HTMLImageElement | HTMLVideoElement | Blob | ArrayBuffer | Uint8Array | Error} LoadedResource
 */

export {};
