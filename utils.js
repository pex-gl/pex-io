function xhrGet(url, type = "", done) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = type;
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) done(request);
  };
  request.send(null);
}

function promisify(fn) {
  return function (file, cb) {
    if (cb) {
      return fn(file, cb);
    } else {
      return new Promise((resolve, reject) => {
        fn(file, (err, data) => {
          if (err) return reject(err);
          else resolve(data);
        });
      });
    }
  };
}

export { xhrGet, promisify };
