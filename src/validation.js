/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

function validateRequest(req, res, next) {
  const schema = Joi.object({
    region: Joi.object({
      name: Joi.string().required(),
      avgAge: Joi.number().required(),
      avgDailyIncomeInUSD: Joi.number().required(),
      avgDailyIncomePopulation: Joi.number().required()
    }),
    periodType: Joi.string().valid('days', 'weeks', 'months').required(),
    timeToElapse: Joi.number().required(),
    reportedCases: Joi.number().required(),
    population: Joi.number().required(),
    totalHospitalBeds: Joi.number().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  next();
}

module.exports = { validateRequest };
