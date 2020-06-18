import React from "react";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";
import "./Nav.css";
import NavList from "../NavList/NavList";

const links = {
  growth: {
    GDP: "Gross Domestic Product",
    GDPC1: "Real Gross Domestic Product",
    GDPPOT: "Potential Gross Domestic Product"
  },
  pricesinflation: {
    CPIAUCSL: "Consumer Price Index for All Urban Consumers: All Items",
    CPILFESL:
      "Consumer Price Index for All Urban Consumers: All Items Less Food & Energy",
    GDPDEF: "Gross Domestic Product: Implicit Price Deflator"
  },
  moneysupply: {
    BASE: "St. Louis Adjusted Monetary Base",
    M1: "M1 Money Stock",
    M2: "M2 Money Stock",
    M1V: "Velocity of M1 Money Stock",
    M2V: "Velocity of M2 Money Stock"
  },
  interestrates: {
    DFF: "Effective Federal Funds Rate",
    DTB3: "3-Month Treasury Bill: Secondary Market Rate",
    DGS5: "5-Year Treasury Constant Maturity Rate",
    DGS10: "10-Year Treasury Constant Maturity Rate",
    DGS30: "30-Year Treasury Constant Maturity Rate",
    T5YIE: "5-year Breakeven Inflation Rate",
    T10YIE: "10-year Breakeven Inflation Rate",
    T5YIFR: "5-Year, 5-Year Forward Inflation Expectation Rate",
    TEDRATE: "TED Spread",
    DPRIME: "Bank Prime Loan Rate"
  },
  employment: {
    UNRATE: "Civilian Unemployment Rate",
    NROU: "Natural Rate of Unemployment (Long-Term)",
    NROUST: "Natural Rate of Unemployment (Short-Term)",
    CIVPART: "Civilian Labor Force Participation Rate",
    EMRATIO: "Civilian Employment-Population Ratio",
    UNEMPLOY: "Unemployed",
    PAYEMS: "All Employees: Total nonfarm",
    MANEMP: "All Employees: Manufacturing",
    ICSA: "Initial Claims",
    IC4WSA: "4-Week Moving Average of Initial Claims"
  },
  incomeandexpenditure: {
    MEHOINUSA672N: "Real Median Household Income in the United States",
    DSPIC96: "Real Disposable Personal Income",
    PCE: "Personal Consumption Expenditures",
    PCEDG: "Personal Consumption Expenditures: Durable Goods",
    PSAVERT: "Personal Saving Rate",
    RRSFS: "Real Retail and Food Services Sales",
    DSPI: "Disposable personal income"
  },
  debt: {
    GFDEBTN: "Federal Debt: Total Public Debt",
    GFDEGDQ188S:
      "Federal Debt: Total Public Debt as Percent of Gross Domestic Product",
    EXCSRESNW: "Excess Reserves of Depository Institutions",
    TOTCI: "Commercial and Industrial Loans, All Commercial Banks"
  }
};

const linkNameMappings = [
  "Economic Growth",
  "Prices & Inflation",
  "Money Supply",
  "Interest Rates",
  "Employment",
  "Income and Expenditure",
  "Debt"
];

function NavBar(props) {
  let i = -1; //Iterator used in loop below.
  let linkKeys = Object.keys(links); //link object fields into an array of strings.
  //Add keys to the navbar
  let collapableLinks = linkKeys.map(link => {
    i++; //increment iterator used to display more human readable name on nav bar.
    return (
      <Link
        className="nav-link custom-link row justify-content-center"
        to={`/${link}`}
      >
        {linkNameMappings[i]}
      </Link>
    );
  });

  let routes = (
    <Switch>
      {linkKeys.map(linkKey => (
        <Route path={`/${linkKey}`}>
          <NavList subDomains={links[linkKey]} />
        </Route>
      ))}
    </Switch>
  );
  let navbar = (
    <React.Fragment>
      <div className="collapse" id={"links"}>
        <div>{collapableLinks}</div>
      </div>
      <nav className="navbar navbar-expand-xl navbar-light nav-custom">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#links"
          aria-controls="links"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      {routes}
    </React.Fragment>
  );

  return navbar;
}

export default NavBar;
