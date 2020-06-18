import React from "react";

//This component toggles which slice of the array to rander in the Table component
function PageToggle(props) {
  return (
    <React.Fragment>
      <section className="row align-items-center justify-content-center">
        <h3>Select a Page</h3>
      </section>
      <section className="row align-items-center justify-content-center">
        <button
          name="previous-page"
          onClick={e => props.onClick(e)}
          className="btn btn-primary"
        >
          Previous Page
        </button>
        <span> Page:{props.page}</span>
        <button
          name="next-page"
          onClick={e => props.onClick(e)}
          className="btn btn-primary"
        >
          Next Page
        </button>
      </section>
    </React.Fragment>
  );
}
function Table(props) {
  let results = <div>Table data has not finished loading</div>;

  if (
    props.tableData !== null &&
    props.tableData !== undefined &&
    props.tableData.data
  ) {
    //starting index is the page number multipled by the results rendered per page.
    // I did this way since some of the arrays can contains thousands of entries.
    // what begin equates to is the starting index of the splice of the data array
    //we'd like to display.
    let begin = props.tableData.page * props.tableData.resultsPerPage;
    let end = begin + props.tableData.resultsPerPage; //
    let splice = props.tableData.data.slice(begin, end);

    if (splice !== undefined && splice !== null) {
      results = splice.map(data => (
        <section className="row align-items-center justify-content-center border-bottom-black custom-row">
          <div className="col-6">{data[0]}</div>
          <div className="col-6">{data[1]}</div>
        </section>
      ));
    }
  }
  let retVal = (
    <div className="container table-display">
      {" "}
      <section className="row align-items-center justify-content-center custom-header-row border-bottom-black">
        <div className="col-6">Date</div>
        <div className="col-6">Measurement</div>
      </section>
      {results}
    </div>
  );

  return retVal;
}

export default Table;
