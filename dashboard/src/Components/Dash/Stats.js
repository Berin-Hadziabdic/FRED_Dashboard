import React from "react";

function calculateMean(data) {
  let mean = 0;
  for (let i = 0; i < data.length; i++) mean += data[i];
  mean = mean / data.length;

  return mean;
}

function getMedian(data) {
  return data[Math.floor(data.length / 2)];
}

function calculateMode(data) {
  let modeKeeper = {};
  let modeValue = undefined;
  let modeCount = 0;

  for (let i = 0; i < data.length; i++) {
    modeValue = data[i];

    if (modeKeeper[modeValue] !== undefined) {
      modeKeeper[modeValue] += 1;
    } else {
      modeKeeper[modeValue] = 1;
    }
  }

  modeValue = undefined;

  for (let i in modeKeeper) {
    if (modeKeeper[i] > modeCount) {
      modeCount = modeKeeper[i];
      modeValue = i;
    }

    return [modeValue, modeCount];
  }
}

function getLowestValue(data) {
  let lowestValue = data[0];
  let lowestBuffer = 0;

  for (let i = 0; i < data.length; i++) {
    lowestBuffer = data[i];
    if (lowestBuffer < lowestValue) {
      lowestValue = lowestBuffer;
    }
  }
  return lowestValue;
}

function getHighestValue(data) {
  let highestValue = 0;
  let highestBuffer = 0;

  for (let i = 0; i < data.length; i++) {
    highestBuffer = data[i];
    if (highestBuffer > highestValue) {
      highestValue = highestBuffer;
    }
  }
  return highestValue;
}

function calculateVariance(data, mean) {
  let sumOfSquares = 0;
  let diff = 0;
  let length = data.length;
  let variance = 0;

  for (let i = 0; i < data.length; i++) {
    diff = mean - data[i];
    diff = diff * diff;
    sumOfSquares += diff;
    diff = 0;
  }

  variance = sumOfSquares / length;

  return variance;
}

function calcateStandardDeviation(data, mean) {
  let sumOfSquares = 0;
  let diff = 0;
  let length = data.length;
  let std = 0;

  for (let i = 0; i < data.length; i++) {
    diff = mean - data[i];
    diff = diff * diff;
    sumOfSquares += diff;
    diff = 0;
  }

  std = sumOfSquares / length;
  std = Math.sqrt(std);

  return std;
}

function Stats(props) {
  let data = null;
  let mean = 0;
  let median = 0;
  let mode = 0;
  let datapoints = 0;
  let lowestValue = 0;
  let highestValue = 0;
  let variance = 0;
  let standardDeviation = 0;
  let retval = (
    <section className="container">
      <div>No statistical information computed yet...</div>
    </section>
  );

  if (props.dataset !== undefined && props.dataset.data !== undefined) {
    data = props.dataset.data;
    if (data.length !== undefined && data.length !== null && data.length > 0) {
      datapoints = data.length;
      mean = calculateMean(data);
      median = getMedian(data);
      mode = calculateMode(data);
      highestValue = getHighestValue(data);
      lowestValue = getLowestValue(data);
      variance = calculateVariance(data, mean);
      standardDeviation = calcateStandardDeviation(data, mean);
      let dummyColumn = null;

      retval = (
        <section className="container stats-report mx-0 px-0 w-100">
          <div className="row stats-row align-items-center justify-content-center">
            <div className="col-12 col-sm-4">Mean: {mean}</div>
            <div className="col-12 col-sm-4">Median: {median}</div>
            <div className="col-12 col-sm-4">Mode Value: {mode[0]}</div>
          </div>
          <div className="row stats-row align-items-center justify-content-center">
            <div className="col-12 col-sm-4">Datapoints: {datapoints}</div>
            <div className="col-12 col-sm-4">Lowest: {lowestValue}</div>
            <div className="col-12 col-sm-4">Highest: {highestValue}</div>
          </div>
          <div className="row stats-row align-items-center justify-content-center">
            <div className="col-12 col-sm-4">Variance: {variance}</div>
            <div className="col-12 col-sm-4">
              Standard Dev: {standardDeviation}
            </div>
          </div>
          <div className="col-12 col-sm-4">{dummyColumn}</div>
        </section>
      );
    }
  }

  return retval;
}

export default Stats;
