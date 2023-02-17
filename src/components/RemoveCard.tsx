import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeCardFromWishList } from "../store/wishlists-actions";
import DeleteActions from "./UI/DeleteActions";
import Modal from "./UI/Modal";

const RemoveCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentWishList = useAppSelector(
    (state) => state.wishLists.currentWishList
  );
  const currentCard = useAppSelector((state) => state.cards.currentCard);

  const deleteHandler = () => {
    dispatch(
      removeCardFromWishList(
        currentWishList.wish_list_name,
        currentCard.card_name
      )
    );
    navigate(`/wish-lists/details/${currentWishList.wish_list_name}`);
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions
        routePath={`/wish-lists/details/${currentWishList.wish_list_name}`}
        deleteHandler={deleteHandler}
      />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to remove this card from the wish list?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Wish List"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate(`/wish-lists/details/${currentWishList.wish_list_name}`);
        }}
      />
    </div>
  );
};

export default RemoveCard;
