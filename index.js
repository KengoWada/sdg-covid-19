const express = require('express');
const responseTime = require('response-time');
const { getLogsEndpoint, estimateCases } = require('./src/controllers');
const { createLogsTable, pool } = require('./src/db');
const { responseTimeHandler } = require('./src/logger');
const { validateRequest } = require('./src/validation');

const app = express();

app.use(express.json());
app.use(responseTime(responseTimeHandler));

pool.query(createLogsTable, () => {});

// API Endpoints
app.post('/api/v1/on-covid-19', validateRequest, estimateCases);
app.post('/api/v1/on-covid-19/:returnType', validateRequest, estimateCases);
app.get('/api/v1/on-covid-19/logs', getLogsEndpoint);

const port = process.env.PORT || 3000;
app.listen(port);
