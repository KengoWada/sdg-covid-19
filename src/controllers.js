const objectToXML = require('object-to-xml');
const estimator = require('./estimator');
const { getLogs, pool } = require('./db');

const getLogsEndpoint = (req, res) => {
  pool.query(getLogs, (err, resp) => {
    if (err) {
      throw err;
    }

    const logs = resp.rows;
    let longestMethod = 0;
    let longestEndpoint = 0;
    let longestResponse = 0;

    logs.forEach((log) => {
      if (log.method.length > longestMethod) {
        longestMethod = log.method.length;
      }
      if (log.endpoint.length > longestEndpoint) {
        longestEndpoint = log.endpoint.length;
      }
      if (log.restime.length > longestResponse) {
        longestResponse = log.restime.length;
      }
    });

    const formattedLogs = logs.map((log) => {
      if (log.method.length < longestMethod) {
        const lengthDiff = longestMethod - log.method.length + 1;
        log.method += new Array(lengthDiff).join(' ');
      }
      if (log.endpoint.length < longestEndpoint) {
        const lengthDiff = longestEndpoint - log.endpoint.length + 1;
        log.endpoint += new Array(lengthDiff).join(' ');
      }
      if (log.restime.length < longestResponse) {
        const lengthDiff = longestResponse - log.restime.length + 1;
        log.restime = new Array(lengthDiff).join(' ') + log.restime;
      }

      return `${log.method}\t\t${log.endpoint}\t\t${log.statuscode}\t\t${log.restime} ms\n`;
    });

    const response = formattedLogs;

    res.status(200).json(response);
  });
};

const estimateCases = (req, res) => {
  const response = estimator(req.body);

  if (req.params.returnType === 'xml') {
    res.set('Content-Type', 'text/xml');
    return res.status(200).json(
      objectToXML({
        '?xml version="1.0" ?': null,
        response
      })
    );
  }

  return res.status(200).json(response);
};

module.exports = { getLogsEndpoint, estimateCases };
