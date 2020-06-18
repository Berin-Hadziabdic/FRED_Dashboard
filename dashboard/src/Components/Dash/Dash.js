import React from "react";
import { Line } from "react-chartjs-2";
import "./Dash.css";
import Table from "./Table";
import Stats from "./Stats";
import DataToggle from "./PageToggle";

class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderChart: false, //This bool decides whether or not to render data or chart.
      chartAxis: { startYear: null, endYear: null }, //This variable determines the chart axis start and end.
      completeChartData: null,
      dataFrequency: 1,
      numericalData: [],
      chartData: {
        startYear: null, //this start value represents the starting yr on the dataset.
        endYear: null, //this end year represents the ending year on the dataset.
        //These values represent the start and end dates on the actual graph label, which can be adjusted
        title: {
          display: true,
          text: "Loading Data",
          fontSize: 20
        },
        labels: [],
        datasets: []
      },
      tableData: { page: "---", resultsPerPage: 0, data: null },
      description: "Loading Descripton..."
    };
  }

  //Do some basic validation to make sure stuff recieved from the
  //server is usable

  setChartState = (startYear, endYear) => {
    let labels = this.buildAxisLabels(startYear, endYear); //build the labels.
    let name = "";
    let chartData = this.buildSlicedDataChart(startYear, endYear);

    this.setState({
      chartAxis: { startYear: startYear, endYear: endYear },
      chartData: {
        startYear: this.state.chartData.startYear || startYear,
        endYear: this.state.chartData.endYear || endYear,
        title: {
          display: true,
          text: this.state.chartTitle,
          fontSize: 20,
          position: "top"
        },
        labels: labels,
        datasets: [
          {
            label: this.state.chartTitle,
            data: chartData
          }
        ]
      }
    });
  };
  validateJSON = json => {
    let data = undefined;

    if (json !== null && json !== undefined) {
      let dataset = json.dataset;
      if (dataset !== undefined && dataset !== null) {
        if (dataset.frequency && dataset.data) {
          data = json.dataset;
        }
      }
    }

    return data;
  };

  shouldComponentUpdate(nextProps, nextState) {
    let nextAxisStart = nextState.chartAxis.startYear;
    let nextAxisEnd = nextState.chartAxis.endYear;
    let axisUpdate =
      nextAxisStart !== this.state.chartAxis.startYear ||
      nextAxisEnd !== this.state.chartAxis.endYear;
    let chartUpdate = this.state.renderChart !== nextState.renderChart;
    let tableUpate =
      this.state.tableData.page != nextState.tableData.page &&
      this.state.tableData.data !== nextState.data;

    return axisUpdate || chartUpdate || tableUpate;
  }

  //builds varying labels for the axis.
  buildAxisLabels = (startYear, endYear) => {
    let labels = [];

    // only build labels if startYear is less than endYear, otherwise return an
    // empty array.
    if (startYear < endYear) {
      for (let i = startYear; i <= endYear; i++) labels.push(i);
    }

    return labels;
  };

  buildSlicedDataChart(startYear, endYear) {
    let data = [];
    let startYearOffset = 0;
    let endYearOffset = 0;
    let splicedChart;

    if (
      this.state.chartData.startYear !== null &&
      this.state.chartData.endYear !== null &&
      this.state.completeChartData
    ) {
      startYearOffset =
        Math.abs(startYear - this.state.chartData.startYear) *
        this.state.frequency;
      endYearOffset =
        Math.abs(endYear - this.state.chartData.endYear) * this.state.frequency;
    }

    endYearOffset = this.state.completeChartData.length - endYearOffset;
    splicedChart = this.state.completeChartData.slice(
      startYearOffset,
      endYearOffset
    );

    return splicedChart;
  }

  //this function process data when it is first loaded from the server.
  processData = json => {
    //Data is divided into daily, monthly, and weekly intervals.
    //Datadivisor is used to help build the chart labels.
    let dataDivisor = 1;
    let dataSet = this.validateJSON(json); //validate json and make sure all fields are present.
    let endYear = 2020;
    let startYear = Math.floor(0);
    let completeChartData = [];
    //Determine dataset frequency and set divisor to matching value.
    if (dataSet !== undefined) {
      //Set dataDivisor to the dataset frequency daily,monthly, or yearly (1 the default)
      switch (dataSet.frequency) {
        case "daily":
          dataDivisor = 365;
          break;
        case "monthly":
          dataDivisor = 12;
          break;
        default:
          break;
      }

      for (let i = 0; i < json.dataset.data.length; i++) {
        completeChartData.unshift(json.dataset.data[i][1]);
      }
      startYear = Math.floor(endYear - dataSet.data.length / dataDivisor);

      //set frequency in state
      this.setState({
        completeChartData: completeChartData,
        frequency: dataDivisor,
        chartTitle: dataSet.name,
        tableData: { page: 0, resultsPerPage: 10, data: dataSet.data },
        description: "Loading Descripton..."
      });
      //use data divisor to estimate start year.
      this.setChartState(startYear, endYear);
      //Build year labels in 10 year increments.
    }
  };

  componentDidMount = () => {
    let superSecureOnGitHub = `https://www.quandl.com/api/v3/datasets/FRED/${this.props.APIEndPoint}?api_key=_wmZxLRTTxChvkafJjFh`;
    fetch(superSecureOnGitHub).then(resp => {
      resp.json().then(json => {
        this.processData(json);
      });
    });
  };

  buildChart = () => {
    return (
      <Line
        data={this.state.chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title: this.state.chartData.title + " Graph",
          legend: {
            display: true,
            position: "top"
          }
        }}
      />
    );
  };

  onClick = e => {
    //I stored these state variables locally to avoid long variable names.
    let name = e.target.name;
    let page = this.state.tableData.page;
    let resultsPerPage = this.state.tableData.resultsPerPage;
    let dataArrayLength = this.state.tableData.data.length;
    let nextPageIndexArrayIndex = (page + 1) * resultsPerPage;
    let stateValue = e.target.value;
    let stateNumericValue = Number(stateValue);

    switch (name) {
      case "table-click":
        this.setState({ renderChart: false });
        break;
      case "chart-click":
        this.setState({ renderChart: true });
        break;
      case "next-page":
        if (nextPageIndexArrayIndex < dataArrayLength) {
          this.setState({
            tableData: {
              page: page + 1,
              resultsPerPage: resultsPerPage,
              data: this.state.tableData.data
            }
          });
        }
        break;
      case "previous-page":
        if (page >= 1) {
          this.setState({
            tableData: {
              page: page - 1,
              resultsPerPage: resultsPerPage,
              data: this.state.tableData.data
            }
          });
        }
        break;
      case "start-year":
        if (stateNumericValue) {
          this.setChartState(stateNumericValue, this.state.chartAxis.endYear);
        }
        break;
      case "end-year":
        if (stateNumericValue) {
          this.setChartState(this.state.chartAxis.startYear, stateNumericValue);
        }
        break;
    }
  };

  toggleRenderChartTable = e => {};

  onChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    let numericalValue = Number(value);
    let stateStartYear = this.state.chartData.startYear;
    let stateEndYear = this.state.chartData.endYear;

    switch (name) {
      case "start-year":
        if (
          numericalValue &&
          numericalValue < stateEndYear &&
          numericalValue > stateStartYear
        )
          this.setState({
            chartAxis: {
              startYear: numericalValue,
              endYear: this.state.chartAxis.endYear
            }
          });
        break;
      case "end-year":
        if (
          numericalValue &&
          numericalValue > stateStartYear &&
          numericalValue <= stateEndYear
        )
          this.setState({
            chartAxis: {
              startYear: this.state.chartAxis.startYear,
              endYear: numericalValue
            }
          });
        break;
      default:
        break;
    }
  };

  render() {
    let renderResult = (
      <section className="container w-100 dash-container">
        <section className="row custom-header-row align-items-center">
          <a
            name="chart-click"
            className="link mx-0 px-0 col justify-content-center align-items-center"
            to={`${this.state.url}/'table'`}
            onClick={this.onClick}
          >
            {" "}
            Chart
          </a>
          <a
            name="table-click"
            className="link mx-0 px-0 col justify-content-center align-items-center"
            to={`${this.state.url}/'table'`}
            onClick={this.onClick}
          >
            Table
          </a>
        </section>

        <section className="row  data-display">
          {" "}
          {this.state.renderChart ? (
            this.buildChart()
          ) : (
            <Table tableClick={this.onClick} tableData={this.state.tableData} />
          )}
        </section>
        <section className="row">
          {" "}
          <DataToggle
            renderChart={this.state.renderChart}
            axisToggle={this.state.chartAxis}
            page={this.state.tableData ? this.state.tableData.page : "---"}
            onClick={this.onClick}
            onChange={this.onChange}
          />
        </section>
        <section className="row col mx-0 px-0">
          <Stats dataset={this.state.chartData.datasets[0]} />
        </section>
      </section>
    );
    return renderResult;
  }
}

export default Dash;
