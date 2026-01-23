# pex-io

[![npm version](https://img.shields.io/npm/v/pex-io)](https://www.npmjs.com/package/pex-io)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/pex-io)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/pex-io)](https://bundlephobia.com/package/pex-io)
[![dependencies](https://img.shields.io/librariesio/release/npm/pex-io)](https://github.com/pex-gl/pex-io/blob/main/package.json)
[![types](https://img.shields.io/npm/types/pex-io)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/pex-gl/pex-io)](https://github.com/pex-gl/pex-io/blob/main/LICENSE.md)

File I/O in [PEX](https://pex.gl).

## Installation

```bash
npm install pex-io
```

## Usage

```js
import * as io from "pex-io";

try {
  const text = await io.loadText("assets/hello.txt");
  // => DOMString
  const json = await io.loadJson("assets/color.json");
  // => Object
  const image = await io.loadImage("assets/pex.png");
  // => HTMLImageElement
  const blob = await io.loadBlob("assets/data");
  // => Blob
  const arrayBuffer = await io.loadArrayBuffer("assets/data.bin");
  // => ArrayBuffer
  const bytes = await io.loadBytes("assets/data.bin");
  // => Uint8Array
} catch (error) {
  console.log(error);
}
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_pex-io">pex-io</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ImageOptions">ImageOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#VideoOptions">VideoOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Resource">Resource</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#LoadedResource">LoadedResource</a> : <code>string</code> | <code>object</code> | <code>HTMLImageElement</code> | <code>Blob</code> | <code>ArrayBuffer</code></dt>
<dd></dd>
</dl>

<a name="module_pex-io"></a>

## pex-io

- [pex-io](#module_pex-io)
  - [.loadText(url, [fetchOptions])](#module_pex-io.loadText) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.loadJson(url, [fetchOptions])](#module_pex-io.loadJson) ⇒ <code>Promise.&lt;JSON&gt;</code>
  - [.loadArrayBuffer(url, [fetchOptions])](#module_pex-io.loadArrayBuffer) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
  - [.loadBytes(url, [fetchOptions])](#module_pex-io.loadBytes) ⇒ <code>Promise.&lt;Uint8Array&gt;</code>
  - [.loadBlob(url, [fetchOptions])](#module_pex-io.loadBlob) ⇒ <code>Promise.&lt;Blob&gt;</code>
  - [.loadImage(urlOrImageProperties, [fetchOptions])](#module_pex-io.loadImage) ⇒ <code>Promise.&lt;HTMLImageElement&gt;</code>
  - [.loadVideo(urlOrVideoProperties, [fetchOptions])](#module_pex-io.loadVideo) ⇒ <code>Promise.&lt;HTMLVideoElement&gt;</code>
  - [.load(resources)](#module_pex-io.load) ⇒ <code>Promise.&lt;Object.&lt;string, LoadedResource&gt;&gt;</code>

<a name="module_pex-io.loadText"></a>

### pex-io.loadText(url, [fetchOptions]) ⇒ <code>Promise.&lt;string&gt;</code>

Load an item and parse the Response as text.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param          | Type                     |
| -------------- | ------------------------ |
| url            | <code>RequestInfo</code> |
| [fetchOptions] | <code>RequestInit</code> |

<a name="module_pex-io.loadJson"></a>

### pex-io.loadJson(url, [fetchOptions]) ⇒ <code>Promise.&lt;JSON&gt;</code>

Load an item and parse the Response as json.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param          | Type                     |
| -------------- | ------------------------ |
| url            | <code>RequestInfo</code> |
| [fetchOptions] | <code>RequestInit</code> |

<a name="module_pex-io.loadArrayBuffer"></a>

### pex-io.loadArrayBuffer(url, [fetchOptions]) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>

Load an item and parse the Response as arrayBuffer.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param          | Type                     |
| -------------- | ------------------------ |
| url            | <code>RequestInfo</code> |
| [fetchOptions] | <code>RequestInit</code> |

<a name="module_pex-io.loadBytes"></a>

### pex-io.loadBytes(url, [fetchOptions]) ⇒ <code>Promise.&lt;Uint8Array&gt;</code>

Load an item and parse the Response as bytes.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param          | Type                     |
| -------------- | ------------------------ |
| url            | <code>RequestInfo</code> |
| [fetchOptions] | <code>RequestInit</code> |

<a name="module_pex-io.loadBlob"></a>

### pex-io.loadBlob(url, [fetchOptions]) ⇒ <code>Promise.&lt;Blob&gt;</code>

Load an item and parse the Response as blob.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param          | Type                     |
| -------------- | ------------------------ |
| url            | <code>RequestInfo</code> |
| [fetchOptions] | <code>RequestInit</code> |

<a name="module_pex-io.loadImage"></a>

### pex-io.loadImage(urlOrImageProperties, [fetchOptions]) ⇒ <code>Promise.&lt;HTMLImageElement&gt;</code>

Create and load a HTML Image. If fetchOptions are specified, load and parse the Response as blob to set the "src" property.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param                | Type                                                              |
| -------------------- | ----------------------------------------------------------------- |
| urlOrImageProperties | <code>string</code> \| [<code>ImageOptions</code>](#ImageOptions) |
| [fetchOptions]       | <code>RequestInit</code>                                          |

<a name="module_pex-io.loadVideo"></a>

### pex-io.loadVideo(urlOrVideoProperties, [fetchOptions]) ⇒ <code>Promise.&lt;HTMLVideoElement&gt;</code>

Create and load a HTML Video. If fetchOptions are specified, load and parse the Response as blob to set the "src" property.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param                | Type                                                              |
| -------------------- | ----------------------------------------------------------------- |
| urlOrVideoProperties | <code>string</code> \| [<code>VideoOptions</code>](#VideoOptions) |
| [fetchOptions]       | <code>RequestInit</code>                                          |

<a name="module_pex-io.load"></a>

### pex-io.load(resources) ⇒ <code>Promise.&lt;Object.&lt;string, LoadedResource&gt;&gt;</code>

Loads resources from a named map.

**Kind**: static method of [<code>pex-io</code>](#module_pex-io)

| Param     | Type                                         |
| --------- | -------------------------------------------- |
| resources | <code>Object.&lt;string, Resource&gt;</code> |

**Example**

```js
const resources = {
  hello: { text: "assets/hello.txt" },
  data: { json: "assets/data.json" },
  img: { image: "assets/tex.jpg" },
  video: { image: "assets/video.mp4" },
  blob: { blob: "assets/blob" },
  hdrImg: { arrayBuffer: "assets/tex.hdr", options: { mode: "no-cors" } },
  bytes: { bytes: "assets/tex.hdr" },
};

const res = await io.load(resources);
res.hello; // => string
res.data; // => Object
res.img; // => HTMLImageElement
res.video; // => HTMLVideoElement
res.blob; // => Blob
res.hdrImg; // => ArrayBuffer
res.bytes; // => Uint8Array
```

<a name="ImageOptions"></a>

## ImageOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name    | Type                | Description                                                                                                 |
| ------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| url     | <code>string</code> |                                                                                                             |
| ...rest | <code>\*</code>     | [HTMLImageElement#properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#properties) |

<a name="VideoOptions"></a>

## VideoOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name    | Type                | Description                                                                                               |
| ------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| url     | <code>string</code> |                                                                                                           |
| ...rest | <code>\*</code>     | [HTMLVideoElement#properties](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) |

<a name="Resource"></a>

## Resource : <code>object</code>

**Kind**: global typedef
**Properties**

| Name      | Type                     | Description                                                                                       |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| [text]    | <code>string</code>      |                                                                                                   |
| [json]    | <code>string</code>      |                                                                                                   |
| [image]   | <code>string</code>      |                                                                                                   |
| [binary]  | <code>string</code>      |                                                                                                   |
| [options] | <code>RequestInit</code> | [Request#parameters](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#parameters) |

<a name="LoadedResource"></a>

## LoadedResource : <code>string</code> \| <code>object</code> \| <code>HTMLImageElement</code> \| <code>Blob</code> \| <code>ArrayBuffer</code>

**Kind**: global typedef

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-io/blob/main/LICENSE.md).
