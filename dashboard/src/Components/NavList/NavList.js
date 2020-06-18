import React from "react";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";
import "./NavList.css";
import Dash from "../Dash/Dash";

function NavList(props) {
  let navListLinks = <div>No sub-catagories found.</div>;
  let navListRoutes = null;
  let { path, url } = useRouteMatch();
  let subDomainKeys = null;

  if (props.subDomains !== undefined && props.subDomains !== null) {
    subDomainKeys = Object.keys(props.subDomains);

    navListLinks = subDomainKeys.map(link => {
      return (
        <Link
          className="nav-link custom-link row justify-content-center"
          to={`${url}/${link}/data`}
        >
          {props.subDomains[link]}
        </Link>
      );
    });
    navListRoutes = subDomainKeys.map(link => {
      return (
        <Route exact path={`${path}/${link}/data`}>
          <Dash APIEndPoint={link} />
        </Route>
      );
    });
  }
  navListLinks = (
    <React.Fragment>
      <Route exact path={`${path}`}>
        <section className="nav-sub-list container border w-50">
          <h1 className="nav-heading">Contents</h1>
          {navListLinks}
        </section>
      </Route>
      <Route>{navListRoutes}</Route>
    </React.Fragment>
  );

  return <React.Fragment>{navListLinks}</React.Fragment>;
}

export default NavList;
