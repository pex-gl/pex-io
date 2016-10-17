var gl = require('pex-gl')(512, 512)
var regl = require('regl')(gl)
// var loadimage = require('../loadimage')
// loadimage('pex-logo.png', (err, img) => {

var load = require('../load')

var resources = {
  img: { image: 'pex-logo.png' }
}

load(resources, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  var img = res.img

  console.log('img w:' + img.width + ' h:' + img.height)

  var tex = regl.texture(img)

  var drawImage = regl({
    attributes: {
      position: [[-1, -1], [1, -1], [1, 1], [-1, 1]],
      // flip UV coords to match WebGL
      texCoord: [[0, 1], [1, 1], [1, 0], [0, 0]]
    },
    elements: [[0, 1, 2], [0, 2, 3]],
    uniforms: {
      image: regl.prop('image')
    },
    vert: `
      #ifdef GL_ES
      precision mediump float;
      #endif
      attribute vec2 position;
      attribute vec2 texCoord;
      varying vec2 vTexCoord;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        vTexCoord = texCoord;
      }
    `,
    frag: `
      #ifdef GL_ES
      precision mediump float;
      #endif
      varying vec2 vTexCoord;
      uniform sampler2D image;
      void main() {
        gl_FragColor = texture2D(image, vTexCoord);
      }
    `
  })

  regl.frame(() => {
    regl.clear({
      color: [1, 0, 0, 1],
      depth: 1
    })
    drawImage({image: tex})
  })
})
