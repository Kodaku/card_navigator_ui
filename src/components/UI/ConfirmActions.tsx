import { Fragment } from "react";
import { Link } from "react-router-dom";

const ConfirmActions: React.FC<{
  routePath: string;
  confirmHandler: () => void;
}> = ({ routePath, confirmHandler }) => {
  return (
    <Fragment>
      <button className="btn btn-success" onClick={confirmHandler}>
        Ok
      </button>
      <Link to={routePath} className="btn btn-secondary">
        Cancel
      </Link>
    </Fragment>
  );
};

export default ConfirmActions;
