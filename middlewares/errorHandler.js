module.exports = (err, req, res, _next) => {
  if (err.code) {
    const { code, message } = err;
    return res.status(422).json({ err: { code, message } });
  }
  res.status(500).json({ message: 'Internal error' });
};
