import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { deleteWishList } from "../store/wishlists-actions";
import DeleteActions from "./UI/DeleteActions";
import Modal from "./UI/Modal";

const WishListDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentWishList = useAppSelector(
    (state) => state.wishLists.currentWishList
  );

  const deleteHandler = () => {
    dispatch(deleteWishList(currentWishList.wish_list_name));
    navigate("/wish-lists");
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions routePath={`/wish-lists`} deleteHandler={deleteHandler} />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to delete this wish list?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Wish List"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/wish-lists");
        }}
      />
    </div>
  );
};

export default WishListDelete;
