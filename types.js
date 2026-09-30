/**
 * @typedef {object} ImageOptions
 * @property {string | URL} url
 * @property {...any} rest {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#properties|HTMLImageElement#properties}
 */
/**
 * @typedef {object} VideoOptions
 * @property {string | URL} url
 * @property {string} [readyEvent='canplaythrough'] Event resolving the promise.
 *   "canplaythrough" might never fire depending on "preload" and platform
 *   policies (eg. iOS, data saver): use an earlier event like "loadedmetadata"
 *   or "canplay" instead.
 * @property {...any} rest {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video|HTMLVideoElement#properties}
 */

/**
 * @typedef {object} Resource
 * @property {string | URL} [text]
 * @property {string | URL} [json]
 * @property {string | URL | ImageOptions} [image]
 * @property {string | URL | VideoOptions} [video]
 * @property {string | URL} [blob]
 * @property {string | URL} [arrayBuffer]
 * @property {string | URL} [bytes]
 * @property {RequestInit} [options] {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#parameters|Request#parameters}
 */
/**
 * @typedef {string
 *   | object
 *   | HTMLImageElement
 *   | HTMLVideoElement
 *   | Blob
 *   | ArrayBuffer
 *   | Uint8Array
 *   | Error} LoadedResource
 */

export {};
