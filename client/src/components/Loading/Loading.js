import React from "react";

// CSS
import "./Loading.css";

function Loading() {
  return (
    <div className="LoadingModal">
      <div className="LoadingContents">
        <img src="/images/loading.png" alt="loading" />
      </div>
    </div>
  );
}

export default Loading;
