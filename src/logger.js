const { insertLogs, pool } = require('./db');

function responseTimeHandler(req, res, time) {
  const values = [
    req.method,
    req.url,
    res.statusCode.toString(),
    time.toFixed(2)
  ];
  pool.query(insertLogs, values, (err, resp) => {
    if (err) {
      throw err;
    }

    return resp;
  });
}

module.exports = { responseTimeHandler };
