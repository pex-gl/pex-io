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

export { promisify };
