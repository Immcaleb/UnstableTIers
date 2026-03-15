let results = [];

module.exports = (req, res) => {
  if (req.method === "POST") {
    const body = req.body || {};

    results.push(body);

    return res.status(200).json({
      success: true,
      received: body
    });
  }

  if (req.method === "GET") {
    return res.status(200).json(results);
  }

  return res.status(405).json({
    error: "Method not allowed"
  });
};