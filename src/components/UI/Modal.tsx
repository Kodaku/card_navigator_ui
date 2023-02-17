import { MouseEventHandler } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  title: string;
  content: () => JSX.Element;
  actions: () => JSX.Element;
  onDismiss: MouseEventHandler;
};

const Modal: React.FC<ModalProps> = (props) => {
  const modalStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  } as React.CSSProperties;

  const modalFadeStyle = {
    bottom: "13%",
  } as React.CSSProperties;

  const modalContentStyle = {
    height: "100%",
    width: "100%",
  } as React.CSSProperties;
  return ReactDOM.createPortal(
    <div
      className="modal show fade"
      style={modalStyle}
      onClick={props.onDismiss}
    >
      <div
        className="modal-dialog"
        style={modalFadeStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content" style={modalContentStyle}>
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={props.onDismiss}
            ></button>
          </div>
          <div className="modal-body">{props.content()}</div>
          <div className="modal-footer">{props.actions()}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal") as HTMLElement
  );
};

export default Modal;
