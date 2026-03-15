module.exports = (req, res) => {
  if (req.method === "POST") {
    const body = req.body || {};
    return res.status(200).json({
      success: true,
      received: body
    });
  }

  if (req.method === "GET") {
    return res.status(200).json([]);
  }

  return res.status(405).json({
    error: "Method not allowed"
  });
};