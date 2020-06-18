import React from "react";
import "./PageToggle.css";

//This component toggles which slice of the array to rander in the Table component
function DataToggle(props) {
  if (props.renderChart === false)
    return (
      <section className="container toggle-container mx-0 px-0 align-items-center page-toggle-container page-text py-1">
        <section className=" row align-items-center justify-content-center mx-0 px-0">
          <h3 className="custom-header toggle-header">Select a Page</h3>
        </section>
        <section className="row align-items-center justify-content-center fit-content">
          <button
            name="previous-page"
            onClick={e => props.onClick(e)}
            className="btn btn-primary col-md-3"
          >
            Previous Page
          </button>

          <span className="col-md-3"> Page:{props.page}</span>
          <button
            name="next-page"
            onClick={e => props.onClick(e)}
            className="btn btn-primary col-md-3"
          >
            Next Page
          </button>
        </section>
      </section>
    );
  else {
    return (
      <section className="container toggle-container mx-0 px-0 align-items-center page-toggle-container py-1">
        <section className="row justify-content-center align-items-center h-100">
          <section className="col-12 col-md-6">
            <h3 className="custom-header toggle-header col-12">Start year</h3>
            <input
              type="number"
              value={props.axisToggle.startYear}
              onClick={e => props.onClick(e)}
              name="start-year"
              onChange={e => props.onChange(e)}
            />
          </section>
          <section className="col-12 col-md-6">
            <h3 className="custom-header toggle-header col-12">
              Select End year
            </h3>
            <input
              type="number"
              value={props.axisToggle.endYear}
              onClick={e => props.onClick(e)}
              name="end-year"
              onChange={e => props.onChange(e)}
            />
          </section>
        </section>
      </section>
    );
  }
}

export default DataToggle;
