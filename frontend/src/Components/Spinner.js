import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Spinner = ({ loading }) => {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: " rgba(0, 0, 0, 0.12)",
    // backgroundColor: "#f0f0f0",
  };

  return (
    <div style={spinnerStyle}>
      <HashLoader
        color="#3498db"
        loading={loading}
        size={50}
        aria-label="Loading HashLoader"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
