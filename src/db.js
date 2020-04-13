const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const createLogsTable = `
CREATE TABLE IF NOT EXISTS logs(
    id SERIAL,
    method VARCHAR(25) NULL,
    endpoint VARCHAR(255) NOT NULL,
    statuscode VARCHAR(3) NOT NULL,
    restime VARCHAR(25) NOT NULL
);`;

const insertLogs = `
INSERT INTO logs(method, endpoint, statuscode, restime) VALUES($1, $2, $3, $4);
`;

const getLogs = 'SELECT * FROM logs;';

module.exports = {
  createLogsTable,
  insertLogs,
  getLogs,
  pool
};
