/* eslint-disable arrow-body-style */

const numberOfDays = (periodType, period) => {
  let days;
  switch (periodType) {
    case 'days':
      days = period;
      break;
    case 'weeks':
      days = period * 7;
      break;
    case 'months':
      days = period * 30;
      break;
    default:
      days = 1;
  }

  return days;
};

const currentlyInfected = (reportedCases, severity = '') => {
  if (severity === 'severe') {
    return reportedCases * 50;
  }

  return reportedCases * 10;
};

const infectionsByRequestedTime = (infectedCurrently, days) => {
  const factor = Math.floor(days / 3);
  return infectedCurrently * 2 ** factor;
};

const severeCases = (requestedTimeInfections) => {
  return Math.floor(0.15 * requestedTimeInfections);
};

const hospitalBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  let availableHospitalBeds = 0.35 * totalHospitalBeds;
  availableHospitalBeds = Math.floor(
    availableHospitalBeds - severeCasesByRequestedTime
  );

  return availableHospitalBeds < 0
    ? availableHospitalBeds + 1
    : availableHospitalBeds;
};

const casesForICU = (requestedTimeInfections) => {
  return Math.floor(0.05 * requestedTimeInfections);
};

const casesForVentilators = (requestedTimeInfections) => {
  return Math.floor(0.02 * requestedTimeInfections);
};

const dollarsInFlight = (avgIncome, avgIncomePopn, reqTimeInfections, days) => {
  const incomeLost = (reqTimeInfections * avgIncomePopn * avgIncome) / days;
  return Math.floor(incomeLost);
};

const calculateImpact = (data, severity = '') => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    region
  } = data;

  const days = numberOfDays(periodType, timeToElapse);
  const infectedCurrently = currentlyInfected(reportedCases, severity);
  const requestedTimeInfections = infectionsByRequestedTime(
    infectedCurrently,
    days
  );
  const severeCasesByRequestedTime = severeCases(requestedTimeInfections);
  const hospitalBedsByRequestedTime = hospitalBeds(
    totalHospitalBeds,
    severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = casesForICU(requestedTimeInfections);
  const casesForVentilatorsByRequestedTime = casesForVentilators(
    requestedTimeInfections
  );
  const incomeLost = dollarsInFlight(
    region.avgDailyIncomeInUSD,
    region.avgDailyIncomePopulation,
    requestedTimeInfections,
    days
  );

  const output = {
    currentlyInfected: infectedCurrently,
    infectionsByRequestedTime: requestedTimeInfections,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight: incomeLost
  };

  return output;
};

module.exports = calculateImpact;
