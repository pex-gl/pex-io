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
import pexIo from "pex-io";
console.log(pexIo);
```

## API

<!-- api-start -->

## Functions

<dl>
<dt><a href="#load">load(resources, callback)</a></dt>
<dd><p>Loads resources from a named map</p>
</dd>
<dt><a href="#loadBinary">loadBinary(file, [callback])</a></dt>
<dd><p>Loads binary data</p>
</dd>
<dt><a href="#loadImage">loadImage(urlOrOpts, [callback])</a></dt>
<dd><p>Loads a HTML Image</p>
</dd>
<dt><a href="#loadJSON">loadJSON(url, [callback])</a></dt>
<dd><p>Loads JSON data</p>
</dd>
<dt><a href="#loadText">loadText(url, [callback])</a></dt>
<dd><p>Loads a text file</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Resource">Resource</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#resourceCallback">resourceCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#binaryCallback">binaryCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#imageCallback">imageCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#ImageOptions">ImageOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#jsonCallback">jsonCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#textCallback">textCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="load"></a>

## load(resources, callback)

Loads resources from a named map

**Kind**: global function

| Param     | Type                                               |
| --------- | -------------------------------------------------- |
| resources | <code>Object.&lt;string, Resource&gt;</code>       |
| callback  | [<code>resourceCallback</code>](#resourceCallback) |

**Example**

```js
const resources = {
  hello: { text: "assets/hello.txt" },
  data: { json: "assets/data.json" },
  img: { image: "assets/tex.jpg" },
  hdrImg: { binary: "assets/tex.hdr" },
};

io.load(resources, (err, res) => {
  res.hello; // => String
  res.data; // => Object
  res.img; // => HTMLImageElement
  res.hdrImg; // => ArrayBuffer
  if (err) return console.log(err);
});
```

<a name="loadBinary"></a>

## loadBinary(file, [callback])

Loads binary data

**Kind**: global function

| Param      | Type                                           |
| ---------- | ---------------------------------------------- |
| file       | <code>string</code>                            |
| [callback] | [<code>binaryCallback</code>](#binaryCallback) |

<a name="loadImage"></a>

## loadImage(urlOrOpts, [callback])

Loads a HTML Image

**Kind**: global function

| Param      | Type                                                              |
| ---------- | ----------------------------------------------------------------- |
| urlOrOpts  | <code>string</code> \| [<code>ImageOptions</code>](#ImageOptions) |
| [callback] | [<code>imageCallback</code>](#imageCallback)                      |

<a name="loadJSON"></a>

## loadJSON(url, [callback])

Loads JSON data

**Kind**: global function

| Param      | Type                                       |
| ---------- | ------------------------------------------ |
| url        | <code>string</code>                        |
| [callback] | [<code>jsonCallback</code>](#jsonCallback) |

<a name="loadText"></a>

## loadText(url, [callback])

Loads a text file

**Kind**: global function

| Param      | Type                                       |
| ---------- | ------------------------------------------ |
| url        | <code>string</code>                        |
| [callback] | [<code>textCallback</code>](#textCallback) |

<a name="Resource"></a>

## Resource : <code>Object</code>

**Kind**: global typedef
**Properties**

| Name     | Type                |
| -------- | ------------------- |
| [text]   | <code>string</code> |
| [json]   | <code>string</code> |
| [image]  | <code>string</code> |
| [binary] | <code>string</code> |

<a name="resourceCallback"></a>

## resourceCallback : <code>function</code>

**Kind**: global typedef

| Param | Type                                                                                |
| ----- | ----------------------------------------------------------------------------------- |
| err   | <code>Error</code>                                                                  |
| res   | <code>Object.&lt;string, (string\|Object\|HTMLImageElement\|ArrayBuffer)&gt;</code> |

<a name="binaryCallback"></a>

## binaryCallback : <code>function</code>

**Kind**: global typedef

| Param | Type                     |
| ----- | ------------------------ |
| err   | <code>Error</code>       |
| data  | <code>ArrayBuffer</code> |

<a name="imageCallback"></a>

## imageCallback : <code>function</code>

**Kind**: global typedef

| Param | Type                          |
| ----- | ----------------------------- |
| err   | <code>Error</code>            |
| image | <code>HTMLImageElement</code> |

<a name="ImageOptions"></a>

## ImageOptions : <code>Object</code>

**Kind**: global typedef

| Param   | Type                | Description                                                                                                 |
| ------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| url     | <code>string</code> |                                                                                                             |
| ...rest | <code>\*</code>     | [HTMLImageElement#properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#properties) |

<a name="jsonCallback"></a>

## jsonCallback : <code>function</code>

**Kind**: global typedef

| Param | Type                |
| ----- | ------------------- |
| err   | <code>Error</code>  |
| json  | <code>string</code> |

<a name="textCallback"></a>

## textCallback : <code>function</code>

**Kind**: global typedef

| Param | Type                |
| ----- | ------------------- |
| err   | <code>Error</code>  |
| text  | <code>string</code> |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-io/blob/main/LICENSE.md).
