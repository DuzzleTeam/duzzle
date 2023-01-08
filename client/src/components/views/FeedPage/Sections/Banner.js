import React, { useEffect, useState } from "react";
import { images } from "./banner-images";

import "./Banner.css";

const Banner = ({ postType }) => {
  const [index, setIndex] = useState(0);
  const imageFileNames = [postType, ...images];

  useEffect(() => {
    const countdown = setInterval(() => {
      if (index < images.length) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 5000);

    return () => clearInterval(countdown);
  }, [index]);

  const getStyle = () => ({
    transform: `translateX(-${index * 100}%)`,
  });

  return (
    <section className="FeedBannerContainer">
      <ul className="BannerSlide">
        {imageFileNames.map((image) => (
          <li key={image} style={getStyle()}>
            <img src={`/images/banner/${image}.gif`} alt="banner" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Banner;
