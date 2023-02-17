import axios from "axios";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HOST } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  addWishList,
  fetchWishLists,
  getWishList,
} from "../store/wishlists-actions";
import Footer from "./UI/Footer";
import Sidebar from "./UI/Sidebar";

const WishLists = () => {
  const dispatch = useAppDispatch();
  const wishLists = useAppSelector((state) => state.wishLists.wishLists);
  const nameRef = useRef<HTMLInputElement>(null);
  const tableHeads = ["List Name", "Export", "Delete"];

  useEffect(() => {
    dispatch(fetchWishLists());
  }, [dispatch]);

  const deleteClickHandler = (name: string) => {
    dispatch(getWishList(name));
  };

  const displayWishLists = () => {
    return wishLists.map((wishList) => (
      <tr key={wishList.wish_list_name}>
        <td>
          <Link
            to={`/wish-lists/details/${wishList.wish_list_name}`}
            type="button"
            className="btn btn-info"
          >
            {wishList.wish_list_name}
          </Link>
        </td>
        <td>
          <button
            className="btn btn-success"
            onClick={() =>
              axios.get(
                HOST + `/wish-lists/export/to-csv/${wishList.wish_list_name}`
              )
            }
          >
            Export as CSV
          </button>
        </td>
        <td>
          <Link to="/wish-lists/delete">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteClickHandler(wishList.wish_list_name);
              }}
            >
              Delete
            </button>
          </Link>
        </td>
      </tr>
    ));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const areCurrentsOk = nameRef.current;
    if (areCurrentsOk) {
      if (nameRef.current.value !== null) {
        dispatch(
          addWishList({ wish_list_name: nameRef.current.value, cards: [] })
        );
      }
    }
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
                    <h3 className="font-weight-bold">Wish Lists</h3>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div className="justify-content-end d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-md-1">
                  <label className="form-label">New WishList </label>
                </div>
                <div className="col-md-4">
                  <input ref={nameRef} className="form-control" />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
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
                  <tbody>{displayWishLists()}</tbody>
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

export default WishLists;
