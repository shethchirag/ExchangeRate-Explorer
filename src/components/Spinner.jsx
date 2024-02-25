import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties, useState } from "react";

const override = {
  display: "block",
  margin: "100px auto",
};

function Spinner() {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#36d7b7"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
