import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Card, Expansion, ExpansionParams } from "../types";
import { getExpansion } from "../store/expansions-actions";
import Sidebar from "./UI/Sidebar";
import Footer from "./UI/Footer";
import { replaceCurrentCard } from "../store/cards-actions";

const ExpansionDetails = () => {
  const params = useParams<ExpansionParams>();
  const expansion: Expansion = useAppSelector(
    (state) => state.expansions.currentExpansion
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.name) {
      dispatch(getExpansion(params.name));
    }
  }, [dispatch, params.name]);

  const width = window.innerWidth / 6;

  const displayCardsRow = (index: number, cards: Card[]) => {
    return (
      <div className="row">
        <div className="col-md-3">
          <h6>{cards[index].card_name.substring(0, 30)}</h6>
          <Link
            onClick={() => dispatch(replaceCurrentCard(cards[index]))}
            to={`/wish-lists/add-card`}
            className="btn btn-success"
          >
            Add To Wishlist
          </Link>
          <h1></h1>
          <img
            width={width}
            height={450}
            src={cards[index].img_url}
            alt={cards[index].card_code}
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
              <Link
                onClick={() => dispatch(replaceCurrentCard(cards[index + 1]))}
                to={`/wish-lists/add-card`}
                className="btn btn-success"
              >
                Add To Wishlist
              </Link>
              <h1></h1>
            </div>
          ) : null}
          {index + 1 < cards.length ? (
            <img
              src={`${cards[index + 1].img_url}`}
              alt={cards[index + 1].card_code}
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
              <Link
                onClick={() => dispatch(replaceCurrentCard(cards[index + 2]))}
                to={`/wish-lists/add-card`}
                className="btn btn-success"
              >
                Add To Wishlist
              </Link>
              <h1></h1>
            </div>
          ) : null}
          {index + 2 < cards.length ? (
            <img
              src={`${cards[index + 2].img_url}`}
              alt={cards[index + 2].card_code}
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
              <Link
                onClick={() => dispatch(replaceCurrentCard(cards[index + 3]))}
                to={`/wish-lists/add-card`}
                className="btn btn-success"
              >
                Add To Wishlist
              </Link>
              <h1></h1>
            </div>
          ) : null}
          {index + 3 < cards.length ? (
            <img
              src={`${cards[index + 3].img_url}`}
              alt={cards[index + 3].card_code}
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

  const displayCards = (cards: Card[]) => {
    const cardsRows = [];
    for (let i = 0; i < cards.length; i++) {
      if (i % 4 === 0) {
        cardsRows.push(displayCardsRow(i, cards));
      }
    }
    return cardsRows.map((cardsRow) => <div>{cardsRow}</div>);
  };

  const displayCardTypes = () => {
    return expansion.card_types.map((cardType) => {
      return (
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h1 className="font-weight-bold" key={cardType.type_name}>
                    {cardType.type_name}
                  </h1>
                </div>
                <div className="col-12 col-xl-4">
                  <div className="justify-content-end d-flex"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">{displayCards(cardType.cards)}</div>
        </div>
      );
    });
  };

  console.log(expansion);
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
                      {expansion.expansion_full_name}
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

export default ExpansionDetails;
