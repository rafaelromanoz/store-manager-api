module.exports = (err, req, res, _next) => {
  if (err.notfound) {
    const { code, message } = err;
    return res.status(404).json({ err: { code, message } });
  }
  if (err.code) {
    const { code, message } = err;
    return res.status(422).json({ err: { code, message } });
  }
  res.status(500).json({ message: 'Internal error' });
};
