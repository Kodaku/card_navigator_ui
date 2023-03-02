import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Expansion } from "../types";
import Footer from "./UI/Footer";
import Sidebar from "./UI/Sidebar";
import { useEffect } from "react";
import { fetchExpansions } from "../store/expansions-actions";
import { Link } from "react-router-dom";
import { YEARS } from "../constants";

const Home = () => {
  const dispatch = useAppDispatch();
  const expansions: Expansion[] = useAppSelector(
    (state) => state.expansions.expansions
  );

  useEffect(() => {
    dispatch(fetchExpansions());
  }, [dispatch]);

  // console.log(expansions);

  const displayExpansionRow = (expansions: Expansion[], index: number) => {
    return (
      <div className="row">
        <div className="col-md-3">
          <Link
            to={`/expansions/details/${expansions[index].expansion_full_name}`}
            type="button"
            className="btn btn-info"
          >
            {expansions[index].expansion_full_name}
          </Link>
        </div>
        {index + 1 < expansions.length ? (
          <div className="col-md-3">
            <Link
              to={`/expansions/details/${
                expansions[index + 1].expansion_full_name
              }`}
              type="button"
              className="btn btn-info"
            >
              {expansions[index + 1].expansion_full_name}
            </Link>
          </div>
        ) : null}
        {index + 2 < expansions.length ? (
          <div className="col-md-3">
            <Link
              to={`/expansions/details/${
                expansions[index + 2].expansion_full_name
              }`}
              type="button"
              className="btn btn-info"
            >
              {expansions[index + 2].expansion_full_name}
            </Link>
          </div>
        ) : null}
        {index + 3 < expansions.length ? (
          <div className="col-md-3">
            <Link
              to={`/expansions/details/${
                expansions[index + 3].expansion_full_name
              }`}
              type="button"
              className="btn btn-info"
            >
              {expansions[index + 3].expansion_full_name}
            </Link>
          </div>
        ) : null}
      </div>
    );
  };

  const displayExpansions = () => {
    const allRows = [];
    for (let i = 0; i < YEARS.length; i++) {
      const expansions_of_year = expansions.filter(
        (expansion) => expansion.year === YEARS[i]
      );
      allRows.push(<h1>{YEARS[i]}</h1>);
      for (let j = 0; j < expansions_of_year.length; j++) {
        if (j % 4 === 0) {
          allRows.push(displayExpansionRow(expansions_of_year, j));
        }
      }
    }
    return allRows.map((row) => <div className="card-body">{row}</div>);
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="row">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h3 className="font-weight-bold">Expansions</h3>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div className="justify-content-end d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">{displayExpansions()}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
