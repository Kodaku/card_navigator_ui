import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Expansion } from "../types";
import Footer from "./UI/Footer";
import Sidebar from "./UI/Sidebar";
import { useEffect } from "react";
import { fetchExpansions } from "../store/expansions-actions";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const expansions: Expansion[] = useAppSelector(
    (state) => state.expansions.expansions
  );

  const tableHeads = ["Expansion Name", "URL"];

  useEffect(() => {
    dispatch(fetchExpansions());
  }, [dispatch]);

  // console.log(expansions);

  const displayExpansions = () => {
    return expansions.map((expansion) => (
      <tr key={expansion.expansion_full_name}>
        <td>
          <Link
            to={`/expansions/details/${expansion.expansion_full_name}`}
            type="button"
            className="btn btn-info"
          >
            {expansion.expansion_full_name}
          </Link>
        </td>
        <td>{expansion.expansion_url}</td>
      </tr>
    ));
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
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {tableHeads.map((tableHead) => (
                        <th key={tableHead}>{tableHead}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{displayExpansions()}</tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
