import React from "react";
import load from "../../../images/load.svg";
import "./notification.css";

const LoadingAdmin = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "#f5c27a",
        // color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <img src={load} className="load" alt="load" />
    </div>
  );
};

export default LoadingAdmin;
