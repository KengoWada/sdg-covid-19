/* eslint-disable arrow-body-style */
const objectToXML = require('object-to-xml');
const estimator = require('./estimator');
const { getLogs, pool } = require('./db');

const getLogsEndpoint = (req, res) => {
  pool.query(getLogs, (err, resp) => {
    if (err) {
      throw err;
    }

    const logs = resp.rows;

    const formattedLogs = logs.map((log) => {
      return `${log.method}    ${log.endpoint}    ${log.statuscode}    0${log.restime}ms\n`;
    });

    res.set('Content-Type', 'text/plain');
    res.status(200).send(formattedLogs.join(''));
  });
};

const estimateCases = (req, res) => {
  const response = estimator(req.body);

  if (req.params.returnType === 'xml') {
    res.set('Content-Type', 'application/xml');
    return res.status(200).send(
      objectToXML({
        '?xml version="1.0" ?': null,
        response
      })
    );
  }

  return res.status(200).json(response);
};

module.exports = { getLogsEndpoint, estimateCases };
