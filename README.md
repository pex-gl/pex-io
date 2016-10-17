# pex-io

Basic file i/o for the pex library.

Works both in [Plask](http://plask.org) and any browser.

## Usage

```bash
npm install pex-io
```

```javascript
var io = require('pex-io')
io.loadImage(url, function (err, img) { })

//or import functions individually

var loadImage = require('pex-io/loadImage')
loadImage(url, function (err, img) { })
```

## API

### io.load(resources, callback)

Loads list of `resources` provided as a hash map of `{ name: { type: url }}`.

```javascript
var resources = {
  hdrImg: { binary: __dirname + '/tex.hdr'}
  img: { image: __dirname + '/tex.jpg'},
  data: { json: __dirname + '/data.json'},
  hello: { text: __dirname + '/hello.txt'}
}

io.load(resources, function(err, res) {
    res.hdrImg //{ArrayBuffer}
    res.img    //{Image} in a Browser or {SkCanvas} in Plask
    res.data   //{JSON}
    res.hello  //{String}
})
```

### io.loadBinary(url, callback)

Loads binary data as an ArrayBuffer from `url` addess in a Browser or file path in Plask. 

```javascript
io.loadBinary('panorama.hdr', function (err, arrayBuffer) { })
```

### io.loadImage(url, callback)

Loads a HTML Image from an url in a Borwser or SkCanvas from a file path in Plask.

```javascript
io.loadImage('texture.jpg', function (err, image) { })
```

### io.loadJSON(url, callback)
Loads a JSON file from an url url in a Browser of from a file path in Plask.

```javascript
io.loadJSON('data.json', function (err, json) { })
```

### io.loadText(url, callback)

Loads a text file from an url url in a Browser of from a file path in Plask.

```javascript
io.loadJSON('data.csv', function (err, string) { })
```
