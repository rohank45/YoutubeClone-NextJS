import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        zIndex: 2,
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
