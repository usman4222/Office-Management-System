module.exports = asyncError => (req, res, next) => {
    try {
      return Promise.resolve(asyncError(req, res, next)); // Await the result
    } catch (err) {
      return next(err); // Handle any synchronous errors
    }
  };
  