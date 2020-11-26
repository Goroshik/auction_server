module.exports = (result, res) => {
  if (result instanceof Error) {
    const err = {
      message: result.message,
      error: true
    };

    if (err.message === 'Invalid Token') {
      return res.status(401).json(err);
    }

    if (err) {
      return res.status(400).json(err);
    }

    return res.status(500).json({ err, result });
  } 

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(404).json();
};