import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { WishList, WishListCard, WishListParams } from "../types";
import Sidebar from "./UI/Sidebar";
import Footer from "./UI/Footer";
import {
  getWishList,
  removeCardFromWishList,
} from "../store/wishlists-actions";

const WishListDetails = () => {
  const params = useParams<WishListParams>();
  const wishList: WishList = useAppSelector(
    (state) => state.wishLists.currentWishList
  );
  const dispatch = useAppDispatch();
  const [cardsToDisplay, setCardsToDisplay] = useState(wishList.cards);

  useEffect(() => {
    if (params.name) {
      dispatch(getWishList(params.name));
      setCardsToDisplay(wishList.cards);
    }
  }, [dispatch, params.name, wishList.cards]);

  const width = window.innerWidth / 6;

  const displayCardsRow = (index: number, cards: WishListCard[]) => {
    return (
      <div className="row">
        <div className="col-md-3">
          <h6>{cards[index].card_name.substring(0, 30)}</h6>
          <button
            onClick={() => {
              dispatch(
                removeCardFromWishList(params.name!, cards[index].card_name)
              );
              setCardsToDisplay((prevState) => {
                return prevState.filter(
                  (card) => card.card_name !== cards[index].card_name
                );
              });
            }}
            className="btn btn-danger"
          >
            Remove From Wish List
          </button>
          <h1></h1>
          <img
            width={width}
            height={450}
            src={cards[index].card_img_url}
            alt={cards[index].card_name}
          />
        </div>
        <div className="col-md-3">
          <h6>
            {index + 1 < cards.length
              ? cards[index + 1].card_name.substring(0, 30)
              : ""}
          </h6>
          {index + 1 < cards.length ? (
            <div>
              <button
                onClick={() => {
                  dispatch(
                    removeCardFromWishList(
                      params.name!,
                      cards[index + 1].card_name
                    )
                  );
                  setCardsToDisplay((prevState) => {
                    return prevState.filter(
                      (card) => card.card_name !== cards[index + 1].card_name
                    );
                  });
                }}
                className="btn btn-danger"
              >
                Remove From Wish List
              </button>
              <h1></h1>
            </div>
          ) : null}
          {index + 1 < cards.length ? (
            <img
              src={`${cards[index + 1].card_img_url}`}
              alt={cards[index + 1].card_name}
              width={width}
              height={450}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-3">
          <h6>
            {index + 2 < cards.length
              ? cards[index + 2].card_name.substring(0, 30)
              : ""}
          </h6>
          {index + 2 < cards.length ? (
            <div>
              <button
                onClick={() => {
                  dispatch(
                    removeCardFromWishList(
                      params.name!,
                      cards[index + 2].card_name
                    )
                  );
                  setCardsToDisplay((prevState) => {
                    return prevState.filter(
                      (card) => card.card_name !== cards[index + 2].card_name
                    );
                  });
                }}
                className="btn btn-danger"
              >
                Remove From Wish List
              </button>
              <h1></h1>
            </div>
          ) : null}
          {index + 2 < cards.length ? (
            <img
              src={`${cards[index + 2].card_img_url}`}
              alt={cards[index + 2].card_name}
              width={width}
              height={450}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-3">
          <h6>
            {index + 3 < cards.length
              ? cards[index + 3].card_name.substring(0, 30)
              : ""}
          </h6>
          {index + 3 < cards.length ? (
            <div>
              <button
                onClick={() => {
                  dispatch(
                    removeCardFromWishList(
                      params.name!,
                      cards[index + 3].card_name
                    )
                  );
                  setCardsToDisplay((prevState) => {
                    return prevState.filter(
                      (card) => card.card_name !== cards[index + 3].card_name
                    );
                  });
                }}
                className="btn btn-danger"
              >
                Remove From Wish List
              </button>
              <h1></h1>
            </div>
          ) : null}
          {index + 3 < cards.length ? (
            <img
              src={`${cards[index + 3].card_img_url}`}
              alt={cards[index + 3].card_name}
              width={width}
              height={450}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const displayCards = (cards: WishListCard[]) => {
    const cardsRows = [];
    for (let i = 0; i < cards.length; i++) {
      if (i % 4 === 0) {
        cardsRows.push(displayCardsRow(i, cards));
      }
    }
    return cardsRows.map((cardsRow) => <div>{cardsRow}</div>);
  };

  const displayCardTypes = () => {
    return (
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="row">
              <div className="col-12 col-xl-8 mb-4 mb-xl-0"></div>
              <div className="col-12 col-xl-4">
                <div className="justify-content-end d-flex"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">{displayCards(cardsToDisplay)}</div>
      </div>
    );
  };

  console.log(wishList);
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
                    <h3 className="font-weight-bold">
                      {wishList.wish_list_name}
                    </h3>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div className="justify-content-end d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">{displayCardTypes()}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WishListDetails;
