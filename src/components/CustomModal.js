import "../styles.css";
import React from "react";

export default function Modal({
  active,
  setActive,
  children,
  additionalClass = "",
  size = "medium",
  bgColor = "#fff"
}) {
  const app = document.querySelector("body"),
    style = {
      backgroundColor: bgColor
    },
    sModalClass = (active ? `cstm_modal active` : `cstm_modal`) + " " + additionalClass,
    sContentClass =
      (active ? "modal_content active" : "modal_content") + " " + size;

  active
    ? app?.classList.add("modal-opened")
    : app?.classList.remove("modal-opened");

  return (
    <div className={sModalClass} onClick={() => setActive(false)}>
      <div
        className={sContentClass}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_close" onClick={() => setActive(false)}>
          &times;
        </div>
        {children}
      </div>
    </div>
  );
}
