import React from "react";

// CSS
import "./Input.css";

// input tag
function Input({ className = "", value, setValue, placeholder }) {
  return (
    <input
      type="text"
      className={className}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Input;
