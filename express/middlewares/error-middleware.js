const errmiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || "backend error";
  const extradetails = err.extradetails || "some error";
  return res.status(status).json({ message, extradetails });
};

module.exports = errmiddleware;
