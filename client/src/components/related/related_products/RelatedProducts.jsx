import React, { useState, useContext, useEffect, useMemo } from "react";
import sampleData from "../sampleData.js";
import Modal from "../modal/Modal.jsx";
import "./RelatedProducts.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState(sampleData);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    // tablet: {
    //   breakpoint: { max: 1024, min: 464 },
    //   items: 2,
    //   slidesToSlide: 2, // optional, default to 1.
    // },
    // mobile: {
    //   breakpoint: { max: 464, min: 0 },
    //   items: 1,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
  };
  return (
    <>
      <h1>Related Products</h1>
      <div className="gridContainer">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
        >
          {/* <div className="gridContainer"> */}
          {relatedProducts.map((item) => (
            <div className="card" key={item.id}>
              <div className="card__body">
                <img
                  className="card__image"
                  src={item.photos[0].thumbnail_url}
                  // width="100"
                  // height="100"
                />
                <div className="card__category">{item.category}</div>
                <div className="card__name">{item.name}</div>
                <div className="card__price">${item.default_price}</div>
                <div className="card__rate">rate: {item.rate[0]}</div>
              </div>
            </div>
          ))}
          {/* </div> */}
        </Carousel>
      </div>
      {/* <div className="gridContainer">
        {relatedProducts.map((item) => (
          <div className="card" key={item.id}>
            <div className="card__body">
              <img
                className="card__image"
                src={item.photos[0].thumbnail_url}
                width="100"
                height="100"
              />
              <div className="card__category">{item.category}</div>
              <div className="card__name">{item.name}</div>
              <div className="card__price">${item.default_price}</div>
              <div className="card__rate">rate: {item.rate[0]}</div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default RelatedProducts;
