const hdom = require('@thi.ng/hdom')
const io = require('..')

var state = {
  callback: {
    text: null,
    json: null,
    image: null,
    binary: null
  },
  callbackBatch: {
    text: null,
    json: null,
    image: null,
    binary: null
  },
  async: {
    text: null,
    json: null,
    image: null,
    binary: null
  },
  asyncBatch: {
    text: null,
    json: null,
    image: null,
    binary: null
  }
}

const appStyle = {
  'font-family': 'sans-serif',
  'line-height': '125%'
}

const techniqueStyle = {
  width: '49%',
  float: 'left',
  'margin-top': '2em'
}

const itemHeaderStyle = {
  margin: '1em 0 0 0',
  padding: 0
}

const loadingStatus = () => {
  const panels = Object.keys(state).map((technique) => {
    const items = Object.keys(state[technique]).map((itemName) => {
      let value = state[technique][itemName]
      if (!value) value = 'loading...'
      if (value.color) value = JSON.stringify(value)
      if (value instanceof window.Image) value = ['img', { src: value.src }]
      if (value instanceof ArrayBuffer) value = `ArrayBuffer ${value.byteLength} bytes`
      return ['div',
        ['h4', { style: itemHeaderStyle }, itemName],
        value
      ]
    })
    return ['div',
      { style: techniqueStyle },
      ['h2', technique],
      items
    ]
  })
  return ['div', panels
  ]
}

const app = () => {
  return () => {
    return ['div#app', { style: appStyle }, loadingStatus()]
  }
}

hdom.start(document.body, app())

// callback

function loadCallback () {
  io.loadText('assets/hello.txt', (err, text) => {
    if (err) return console.log(err)
    state.callback.text = text
  })

  io.loadJSON('assets/color.json', (err, json) => {
    if (err) return console.log(err)
    state.callback.json = json
  })

  io.loadImage('assets/pex.png', (err, image) => {
    if (err) return console.log(err)
    state.callback.image = image
  })

  io.loadBinary('assets/data.bin', (err, data) => {
    if (err) return console.log(err)
    state.callback.binary = data
  })
}

loadCallback()

// callback batch

function loadCallbackBatch () {
  io.load({
    hello: { text: 'assets/hello.txt' },
    color: { json: 'assets/color.json' },
    pex: { image: 'assets/pex.png' },
    data: { binary: 'assets/data.bin' }
  }, (err, res) => {
    if (err) return console.log(err)
    state.callbackBatch.text = res.hello
    state.callbackBatch.json = res.color
    state.callbackBatch.image = res.pex
    state.callbackBatch.binary = res.data
  })
}

loadCallbackBatch()

// async

async function loadAsync () {
  state.async.text = await io.loadText('assets/hello.txt')
  state.async.json = await io.loadJSON('assets/color.json')
  state.async.image = await io.loadImage('assets/pex.png')
  state.async.binary = await io.loadBinary('assets/color.json')
}

loadAsync()

// async batch

async function loadAsyncBatch () {
  const res = await io.load({
    hello: { text: 'assets/hello.txt' },
    color: { json: 'assets/color.json' },
    pex: { image: 'assets/pex.png' },
    data: { binary: 'assets/data.bin' }
  })
  state.asyncBatch.text = res.hello
  state.asyncBatch.json = res.color
  state.asyncBatch.image = res.pex
  state.asyncBatch.binary = res.data
}

loadAsyncBatch()
