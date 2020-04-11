const calculateImpact = require('./utils');

const covid19ImpactEstimator = (data) => {
  const impact = calculateImpact(data);
  const severeImpact = calculateImpact(data, 'severe');
  const output = { data, impact, severeImpact };
  return output;
};

module.exports = covid19ImpactEstimator;
