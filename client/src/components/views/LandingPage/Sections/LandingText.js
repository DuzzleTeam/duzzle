import React from "react";

// CSS
import "./LandingText.css";

// Wezzle, Mezzle Description
// chohadam, 2021-06-20

// icon : title 위 puzzle icon
// text : {
//  title1,
//  description1,
//  title2,
//  description2
// }
function LandingText({ icon, text }) {
  const { title1, accent, description1, title2, description2 } = text;

  return (
    <article className={"LandingTextContainer"}>
      <img src={`/images/landingPage/${icon}.png`} alt={accent} />
      <h1 className={"LandingTextTitle"}>{title1}</h1>
      <p className={"LandingTextDescription"}>
        <span data-color={icon} className={"LandingTextAccent"}>
          {accent}
        </span>
        {description1}
      </p>

      <h2 className={"LandingTextTitle"}>{title2}</h2>
      <p className={"LandingTextDescription"}>{description2}</p>
    </article>
  );
}

export default LandingText;
