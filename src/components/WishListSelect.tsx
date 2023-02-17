import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { addCardToWishList, fetchWishLists } from "../store/wishlists-actions";
import { WishList } from "../types";
import ConfirmActions from "./UI/ConfirmActions";
import Modal from "./UI/Modal";

const WishListSelect = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishLists = useAppSelector((state) => state.wishLists.wishLists);
  const currentCard = useAppSelector((state) => state.cards.currentCard);
  const currentExpansion = useAppSelector(
    (state) => state.expansions.currentExpansion
  );
  const checkboxRef = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    dispatch(fetchWishLists());
  }, [dispatch]);

  const confirmHandler = () => {
    if (checkboxRef.current) {
      checkboxRef.current.forEach((el, index) => {
        if (el.checked) {
          dispatch(
            addCardToWishList(
              wishLists[index].wish_list_name,
              {
                card_img_url: currentCard.img_url,
                card_name: currentCard.card_name,
                quantity: 1,
              },
              1
            )
          );
        }
      });
      navigate(`/expansions/details/${currentExpansion.expansion_full_name}`);
    }
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <ConfirmActions
        routePath={`/expansions/details/${currentExpansion.expansion_full_name}`}
        confirmHandler={confirmHandler}
      />
    );
  };

  const displaySingleIngredientCheckbox = (
    wishList: WishList,
    index: number
  ) => {
    return (
      <div key={wishList.wish_list_name} className="form-check form-check-info">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            ref={(el) => (checkboxRef.current[index] = el!)}
          />
          {wishList.wish_list_name}
          <i className="input-helper"></i>
        </label>
      </div>
    );
  };

  const displayIngredientsColumn = (startIndex: number) => {
    const columnElements = [];
    for (let i = startIndex; i < startIndex + 3 && i < wishLists.length; i++) {
      columnElements.push(displaySingleIngredientCheckbox(wishLists[i], i));
    }

    return {
      newStartIndex: startIndex + 3,
      jsx: <div className="col-md-2">{columnElements}</div>,
    };
  };

  const displayIngredientsRow = (startIndex: number) => {
    const rowElements = [];
    for (let i = 0; i < 5; i++) {
      if (startIndex < wishLists.length) {
        const { newStartIndex, jsx } = displayIngredientsColumn(startIndex);
        startIndex = newStartIndex;
        rowElements.push(jsx);
      } else {
        break;
      }
    }

    return {
      newStartIndex: startIndex,
      jsx: <div className="row">{rowElements}</div>,
    };
  };

  const renderContent = () => {
    let startIndex = 0;
    const contents: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      const { newStartIndex, jsx } = displayIngredientsRow(startIndex);
      startIndex = newStartIndex;
      contents.push(jsx);
    }
    return (
      <Fragment>
        <div>
          Add <h3>{currentCard.card_name}</h3> to some wish list
        </div>
        {contents}
      </Fragment>
    );
  };

  return (
    <div className="container">
      <Modal
        title="Add Card To Wish List"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate(
            `/expansions/details/${currentExpansion.expansion_full_name}`
          );
        }}
      />
    </div>
  );
};

export default WishListSelect;
